import ftp from 'basic-ftp';
import path from 'path';
import fs from 'fs/promises';
import xml2js from 'xml2js';
import Product from '../controllers/Product/productModel.js';
import Category from '../controllers/Category/categoryModel.js';
import dotenv from 'dotenv';
dotenv.config();
const { FTP_HOST, FTP_PORT, FTP_USERNAME, FTP_PASSWORD } = process.env;

const FTP_CONFIG = {
  host: FTP_HOST,
  port: FTP_PORT || 21,
  user: FTP_USERNAME,
  password: FTP_PASSWORD,
  secure: false,
};

const client = new ftp.Client();

export const getFiles = async (localPath, offerId) => {
  try {
    const fullPath = path.join(BASE_DIR, localPath);
    const files = await fs.readdir(fullPath);

    const productPhoto = files.filter(file => {
      const regex = new RegExp(`(^|[^0-9])${offerId}([^0-9]|$)`);
      return regex.test(file);
    });

    const fileBuffers = await Promise.all(
      productPhoto.map(async photo => {
        const filePath = path.join(fullPath, photo);
        const fileBuffer = await fs.readFile(filePath);
        return {
          name: photo,
          buffer: fileBuffer.toString('base64'),
        };
      })
    );

    return { files: fileBuffers };
  } catch (err) {
    console.error('Error retrieving files:', err);
  }
};

export const updateDB = async () => {
  try {
    const remotePath = '/torgsoft';
    const fullPath = path.join(BASE_DIR, remotePath);

    const files = await fs.readdir(fullPath);
    const xmlFiles = files.filter(file => file.endsWith('.trs'));

    for (const file of xmlFiles) {
      const filePath = path.join(fullPath, file);
      let data = await fs.readFile(filePath, 'utf-8');

      data = data.replace(/^[\s\x00-\x1F]+/, '');

      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(data);

      const categories = result.yml_catalog.shop[0].categories[0].category;
      const offers = result.yml_catalog.shop[0].offers[0].offer;

      for (const category of categories) {
        await Category.findOneAndUpdate(
          { id: category.$.id },
          {
            parentId: category.$.parentId || null,
            name: category._,
          },
          { upsert: true, new: true }
        );
      }

      for (const offer of offers) {
        const params = offer.param.reduce((acc, param) => {
          acc[param.$.name] = param._;
          return acc;
        }, {});

        await Product.findOneAndUpdate(
          { offerId: offer.$.id },
          {
            type: offer.$.type || 'vendor.model',
            available: offer.available[0] === 'true',
            currencyId: offer.currencyId[0],
            categoryId: offer.categoryId[0],
            [`paramsFrom_${file.replace('.trs', '').replace('.', '_')}`]: params,
          },
          { upsert: true, new: true }
        );
      }
    }

    console.log('Data successfully updated from local files.');
  } catch (err) {
    console.error('Error updating data:', err);
  }
};

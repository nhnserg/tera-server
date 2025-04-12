import fs from 'fs/promises';
import Product from '../controllers/Product/productModel.js';

export const linkPhotosToProducts = async photosDirectory => {
  try {
    const files = await fs.readdir(photosDirectory);

    for (const file of files) {
      const match = file.match(/^.+?_(\d+)_\d+\..+$/);
      if (match) {
        const offerId = match[1];

        const product = await Product.findOne({ offerId });

        if (product) {
          if (!product.photos.includes(file)) {
            product.photos.push(file);
            await product.save();
          }
        } else {
          await Product.create({
            offerId,
            photos: [file],
          });
        }
      }
    }

    console.log('Фотографии успешно привязаны к продуктам.');
  } catch (err) {
    console.error('Ошибка при привязке фотографий:', err);
  }
};

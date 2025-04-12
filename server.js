import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import cron from 'node-cron';
import dotenv from 'dotenv';
// import { updateDB } from './services/ftpService.js';
import app from './app.js';
import conectMongo from './db/connectMongo.js';
import { linkPhotosToProducts } from './services/linkPhotosToProducts.js';

dotenv.config();
const { PORT } = process.env;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const sslPrivatePath = '/home/tera_admin/ssl/private/tera-mebli.com.key';
// const sslCertPath = '/home/tera_admin/ssl/cert/tera-mebli.com.crt';
// const sslCaPath = '/home/tera_admin/ssl/cert/tera-mebli.com-ca.crt';

// const sslOptions = {
//   key: fs.readFileSync(sslPrivatePath),
//   cert: fs.readFileSync(sslCertPath),
//   ca: fs.readFileSync(sslCaPath),
// };

const startServer = async () => {
  try {
    await conectMongo();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running. Use our API on \x1b[34mport: ${PORT}\x1b[0m`);
    });
    // https.createServer(sslOptions, app).listen(30000, () => {
    //   console.log(`HTTPS Server running on port 3000`);
    // });

    // http
    //   .createServer((req, res) => {
    //     res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    //     res.end();
    //   })
    //   .listen(3344, () => {
    //     console.log('HTTP Server running on \x1b[32mport 80✅\x1b[0m  for redirecting to HTTPS');
    //   });

    // const photosDirectory = '/home/tera_admin/git/torgsoft/photo/';
    // console.log('Linking photos to products...');
    // await linkPhotosToProducts(photosDirectory);
    // console.log('Photos successfully linked to products.');

    // Запуск cron-задачи (если нужно)
    // cron.schedule('*/1 * * * *', async () => {
    //   try {
    //     console.log('Cron job started: Fetching files from FTP...');
    //     await updateDB();
    //     console.log('FTP files processed successfully.');
    //   } catch (error) {
    //     console.error('Error during FTP processing:', error);
    //   }
    // });
  } catch (error) {
    console.error('\x1b[31m❌ Database connection failed:\x1b[0m', error);
    process.exit(1);
  }
};

startServer();

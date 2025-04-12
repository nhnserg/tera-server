import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './helpers/swagger.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import fileRouter from './controllers/File/fileRoutes.js';
import categoryRouter from './controllers/Category/categoryRoutes.js';
import orderRouter from './controllers/Order/orderRoutes.js';
import searchRouter from './controllers/Search/searchRouter.js';
import reviewRouter from './controllers/Review/reviewRoutes.js';
import { errorHandler, notFoundHandler } from './helpers/errorHandlers.js';

const app = express();
app.use(morgan('tiny'));

// const corsOptions = {
//   origin: ['http://tera-mebli.com', 'https://tera-mebli.com', 'http://localhost:3000'],
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// };

// const photosPath = '/home/tera_admin/git/torgsoft/photo/';

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use((req, res, next) => {
//   if (!req.secure && process.env.NODE_ENV === 'production') {
//     return res.redirect(`https://${req.headers.host}${req.url}`);
//   }
//   next();
// });

// app.use('/photos', express.static(photosPath));
app.use('/api/file', fileRouter);
app.use('/api/category', categoryRouter);
app.use('/api', orderRouter);
app.use('/api/search', searchRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

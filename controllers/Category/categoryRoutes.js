import express from 'express';
import {
  getAllCategories,
  getCategoryWithProducts,
  getProductByCategoryOrSubcategory,
  getProductsForSubcategory,
  getSubcategories,
} from './categoryControllers.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);

categoryRouter.get('/:slug/sub', getSubcategories);

categoryRouter.get('/:slug/products', getCategoryWithProducts);

categoryRouter.get('/:slug/:subcategorySlug/products', getProductsForSubcategory);

categoryRouter.get('/:slug/:subcategorySlug/product/:productId', getProductByCategoryOrSubcategory);

export default categoryRouter;

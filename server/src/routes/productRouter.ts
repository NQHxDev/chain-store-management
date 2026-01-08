import express from 'express';

const productRouter = express.Router();

import { BrandController } from '../controllers/productController.ts';

const brandController = new BrandController();

// productRouter.get('/create-product');

//! Brand
productRouter.post('/cooperate-brand', brandController.cooperateNewBrand);

export default productRouter;

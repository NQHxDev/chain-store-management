import type { Request, Response, NextFunction } from 'express';

import type { CooperateRequestBody } from '../types/interfaces/interfaceProduct.ts';
import ProductServices, { BrandServices } from '../services/productServices.ts';

class ProductController {
   createProduct = async (req: Request, res: Response, next: NextFunction) => {};
}

export class BrandController {
   cooperateNewBrand = async (
      req: Request<{}, {}, CooperateRequestBody>,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const data = req.body;

         const result = await BrandServices.cooperateNewBrand(data);

         res.status(201).send({
            status: 'success',
            message: 'Đã thêm Brand vào hệ thống!',
            data: {
               detail: result.data,
            },
         });
      } catch (error) {
         next(error);
      }
   };
}

export default ProductController;

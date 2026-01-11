import { DatabaseError } from '@/appError';
import { executeQuery, transactionQuery } from '@/services/databaseService';
import type { IBrand } from '@/types/interfaces/interfaceProduct';

class ProductRepository {}

export class BrandRepository {
   static addBrand = async (newBrand: IBrand): Promise<any> => {
      try {
         const queryInertBrand =
            'Insert into brands (brand_id, brand_name, brand_slug, brand_priority, brand_status) Values (?, ?, ?, ?, ?)';

         const result = await executeQuery(queryInertBrand, [
            newBrand.brand_id,
            newBrand.brand_name,
            newBrand.brand_slug,
            newBrand.brand_priority,
            newBrand.brand_status,
         ]);

         return result;
      } catch (error: any) {
         throw new DatabaseError(`Xảy ra lỗi khi thêm Brand: ${newBrand.brand_name}`);
      }
   };
}

export default ProductRepository;

import { uuidv7 } from 'uuidv7';

import { BrandRepository } from '@/repositories/repoProduct';
import type { CooperateRequestBody, IBrand } from '@/types/interfaces/interfaceProduct';

class ProductServices {}

export class BrandServices {
   static cooperateNewBrand = async (data: CooperateRequestBody) => {
      const newBrand: IBrand = {
         brand_id: uuidv7(),
         brand_name: data.brandName,
         brand_slug: data.brandSlug,
         brand_priority: data.brandPriority,
         brand_status: 'active',
      };

      await BrandRepository.addBrand(newBrand);
      return {
         data: {
            ac_id: newBrand.brand_id,
            username: newBrand.brand_name,
            email: newBrand.brand_slug,
         },
      };
   };
}

export default ProductServices;

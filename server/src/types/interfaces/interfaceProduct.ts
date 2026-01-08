export interface IBrand {
   brand_id: string | number;
   brand_name: string;
   brand_slug: string;
   brand_priority: number;
   brand_status: string;

   brand_created_at?: Date;
   brand_updated_at?: Date;
}

export interface CooperateRequestBody {
   brandName: string;
   brandSlug: string;
   brandPriority: number;
}

export interface IProductType {
   product_id: string | number;
   product_name: string;
   role_desc?: string;
}

export interface IProduct {
   product_id: string | number;
   product_name: string;
   product_type: number;
   brand_id: string | number;
   product_slug: string;
   product_status: string;
   product_desc?: string;

   product_created_at?: Date;
   product_updated_at?: Date;
   product_deleted_at?: Date;
}

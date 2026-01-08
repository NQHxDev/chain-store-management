export interface IBrand {
   id: string | number;
   name: string;
   slug: string;
   description: string;
   logo: string;
   status: string;
   countProduct: number;
   country: string;
   website: string;

   created_at?: Date;
   updated_at?: Date;
}

export const BrandStories: IBrand[] = [
   {
      id: '1',
      name: 'Nike',
      slug: 'nike',
      description: 'Thương hiệu thể thao hàng đầu thế giới',
      logo: '',
      status: 'active',
      countProduct: 1250,
      country: 'USA',
      website: 'https://nike.com',
      created_at: new Date('2023-01-15'),
   },
   {
      id: '2',
      name: 'Adidas',
      slug: 'adidas',
      description: 'Đồ thể thao và thời trang',
      logo: '',
      status: 'active',
      countProduct: 980,
      country: 'Germany',
      website: 'https://adidas.com',
      created_at: new Date('2023-02-20'),
   },
   {
      id: '3',
      name: 'Apple',
      slug: 'apple',
      description: 'Công nghệ và điện tử tiêu dùng',
      logo: '',
      status: 'active',
      countProduct: 75,
      country: 'USA',
      website: 'https://apple.com',
      created_at: new Date('2023-03-10'),
   },
   {
      id: '4',
      name: 'Samsung',
      slug: 'samsung',
      description: 'Điện tử và thiết bị gia dụng',
      logo: '',
      status: 'active',
      countProduct: 450,
      country: 'South Korea',
      website: 'https://samsung.com',
      created_at: new Date('2023-04-05'),
   },
   {
      id: '5',
      name: 'Sony',
      slug: 'sony',
      description: 'Giải trí và công nghệ',
      logo: '',
      status: 'inactive',
      countProduct: 320,
      country: 'Japan',
      website: 'https://sony.com',
      created_at: new Date('2023-05-15'),
   },
   {
      id: '6',
      name: 'Gucci',
      slug: 'gucci',
      description: 'Thời trang cao cấp',
      logo: '',
      status: 'active',
      countProduct: 210,
      country: 'Italy',
      website: 'https://gucci.com',
      created_at: new Date('2023-06-22'),
   },
   {
      id: '7',
      name: 'Toyota',
      slug: 'toyota',
      description: 'Sản xuất ô tô',
      logo: '',
      status: 'active',
      countProduct: 85,
      country: 'Japan',
      website: 'https://toyota.com',
      created_at: new Date('2023-07-18'),
   },
   {
      id: '8',
      name: 'Coca-Cola',
      slug: 'coca-cola',
      description: 'Đồ uống giải khát',
      logo: '',
      status: 'active',
      countProduct: 25,
      country: 'USA',
      website: 'https://coca-cola.com',
      created_at: new Date('2023-08-30'),
   },
];

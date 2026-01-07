export interface Product {
   id: number;
   name: string;
   category: string;
   price: number;
   stock: number;
   status: string;
   rating: number;
}

export const productStories: Product[] = [
   {
      id: 1,
      name: 'MacBook Pro 16',
      category: 'Laptop',
      price: 3999,
      stock: 15,
      status: 'Còn hàng',
      rating: 4.8,
   },
   {
      id: 2,
      name: 'iPhone 15 Pro',
      category: 'Smartphone',
      price: 999,
      stock: 42,
      status: 'Còn hàng',
      rating: 4.7,
   },
   {
      id: 3,
      name: 'Sony WH-1000XM5',
      category: 'Headphones',
      price: 399,
      stock: 0,
      status: 'Hết hàng',
      rating: 4.6,
   },
   {
      id: 4,
      name: 'Logitech MX Master 3S',
      category: 'Accessories',
      price: 99,
      stock: 28,
      status: 'Còn hàng',
      rating: 4.5,
   },
   {
      id: 5,
      name: 'Samsung Odyssey G9',
      category: 'Monitor',
      price: 1499,
      stock: 8,
      status: 'Sắp hết hàng',
      rating: 4.4,
   },
   {
      id: 6,
      name: 'iPad Pro 12.9"',
      category: 'Tablet',
      price: 1299,
      stock: 22,
      status: 'Còn hàng',
      rating: 4.7,
   },
   {
      id: 7,
      name: 'Apple Watch Ultra',
      category: 'Wearable',
      price: 799,
      stock: 0,
      status: 'Hết hàng',
      rating: 4.5,
   },
   {
      id: 8,
      name: 'Dell XPS 13',
      category: 'Laptop',
      price: 1299,
      stock: 12,
      status: 'Còn hàng',
      rating: 4.3,
   },
];

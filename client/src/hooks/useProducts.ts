'use client';

import { useState, useEffect, useCallback } from 'react';

import { Product } from '@/lib/dashboard/products';

interface UseProductsOptions {
   initialPage?: number;
   pageSize?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
   const { initialPage = 1, pageSize = 10 } = options;

   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [page, setPage] = useState(initialPage);
   const [totalPages, setTotalPages] = useState(1);

   const fetchProducts = useCallback(async () => {
      try {
         setLoading(true);
         // Giả lập API call
         await new Promise((resolve) => setTimeout(resolve, 500));

         const mockProducts = [
            {
               id: 1,
               name: 'MacBook Pro 16"',
               category: 'Laptop',
               price: 3999,
               stock: 15,
               status: 'In Stock',
               rating: 4.8,
            },
            {
               id: 2,
               name: 'iPhone 15 Pro',
               category: 'Smartphone',
               price: 999,
               stock: 42,
               status: 'In Stock',
               rating: 4.7,
            },
            {
               id: 3,
               name: 'Sony WH-1000XM5',
               category: 'Headphones',
               price: 399,
               stock: 0,
               status: 'Out of Stock',
               rating: 4.6,
            },
            {
               id: 4,
               name: 'Logitech MX Master 3S',
               category: 'Accessories',
               price: 99,
               stock: 28,
               status: 'In Stock',
               rating: 4.5,
            },
            {
               id: 5,
               name: 'Samsung Odyssey G9',
               category: 'Monitor',
               price: 1499,
               stock: 8,
               status: 'Low Stock',
               rating: 4.4,
            },
            {
               id: 6,
               name: 'iPad Pro 12.9"',
               category: 'Tablet',
               price: 1299,
               stock: 22,
               status: 'In Stock',
               rating: 4.7,
            },
            {
               id: 7,
               name: 'Apple Watch Ultra',
               category: 'Wearable',
               price: 799,
               stock: 0,
               status: 'Out of Stock',
               rating: 4.5,
            },
            {
               id: 8,
               name: 'Dell XPS 13',
               category: 'Laptop',
               price: 1299,
               stock: 12,
               status: 'In Stock',
               rating: 4.3,
            },
         ];

         setProducts(mockProducts);
         setTotalPages(Math.ceil(mockProducts.length / pageSize));
         setError(null);
      } catch (err) {
         setError('Failed to fetch products');
         console.error(err);
      } finally {
         setLoading(false);
      }
   }, [pageSize]);

   useEffect(() => {
      fetchProducts();
   }, [fetchProducts]);

   const deleteProduct = useCallback(async (id: number) => {
      try {
         // Giả lập API call
         await new Promise((resolve) => setTimeout(resolve, 300));
         setProducts((prev) => prev.filter((p) => p.id !== id));
         return true;
      } catch (err) {
         console.error('Failed to delete product:', err);
         return false;
      }
   }, []);

   const updateProduct = useCallback(async (id: number, data: Product) => {
      try {
         // Giả lập API call
         await new Promise((resolve) => setTimeout(resolve, 300));
         setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
         return true;
      } catch (err) {
         console.error('Failed to update product:', err);
         return false;
      }
   }, []);

   return {
      products,
      loading,
      error,
      page,
      totalPages,
      setPage,
      deleteProduct,
      updateProduct,
      refresh: fetchProducts,
   };
}

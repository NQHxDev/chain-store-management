import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Category {
   id: string;
   name: string;
   description: string;
   color: string;
}

interface CategoryGridProps {
   categories: Category[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
   return (
      <section className="mb-12" aria-labelledby="categories-heading">
         <div className="flex items-center justify-between mb-6">
            <div>
               <h2 id="categories-heading" className="text-3xl font-bold text-gray-900">
                  Danh Mục Nổi Bật
               </h2>
               <p className="text-gray-600 mt-2">Khám phá các sản phẩm theo danh mục</p>
            </div>
            <Link
               href="/categories"
               className="inline-flex items-center text-black hover:text-gray-700 font-medium group"
               aria-label="Xem tất cả danh mục"
            >
               Xem tất cả
               <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
               <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="block group"
                  aria-label={`Xem danh mục ${category.name}`}
               >
                  <Card className="h-full border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 overflow-hidden">
                     <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                           <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-black mb-1">
                                 {category.name}
                              </h3>
                              <p className="text-sm text-gray-600">{category.description}</p>
                           </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                           <span className="text-sm text-gray-500 hover:text-black inline-flex items-center">
                              Xem sản phẩm
                              <ArrowRight className="ml-1 h-3 w-3" />
                           </span>
                        </div>
                     </CardContent>
                  </Card>
               </Link>
            ))}
         </div>
      </section>
   );
};

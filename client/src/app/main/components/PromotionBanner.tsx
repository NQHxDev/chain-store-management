import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tag, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Promotion {
   id: string;
   title: string;
   description: string;
   discount: number;
   endDate: string;
}

interface PromotionBannerProps {
   promotions: Promotion[];
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ promotions }) => {
   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('vi-VN', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      });
   };

   return (
      <section className="mb-12" aria-labelledby="promotions-heading">
         <h2 id="promotions-heading" className="text-3xl font-bold text-gray-900 mb-6">
            Ưu Đãi Đặc Biệt
         </h2>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {promotions.map((promo, index) => (
               <Card
                  key={promo.id}
                  className={cn(
                     'border-0 overflow-hidden',
                     index === 0
                        ? 'bg-gradient-to-r from-gray-900 to-black text-white'
                        : 'bg-gradient-to-r from-gray-50 to-white border border-gray-200'
                  )}
               >
                  <CardContent className="p-6">
                     <div className="flex items-start justify-between">
                        <div>
                           <div className="flex items-center mb-3">
                              <Tag
                                 className={cn(
                                    'h-5 w-5 mr-2',
                                    index === 0 ? 'text-white' : 'text-gray-700'
                                 )}
                              />
                              <span
                                 className={cn(
                                    'text-sm font-medium',
                                    index === 0 ? 'text-gray-300' : 'text-gray-600'
                                 )}
                              >
                                 Khuyến mãi
                              </span>
                           </div>

                           <h3
                              className={cn(
                                 'text-2xl font-bold mb-2',
                                 index === 0 ? 'text-white' : 'text-gray-900'
                              )}
                           >
                              {promo.title}
                           </h3>

                           <p
                              className={cn(
                                 'mb-4',
                                 index === 0 ? 'text-gray-300' : 'text-gray-600'
                              )}
                           >
                              {promo.description}
                           </p>

                           <div className="flex items-center text-sm">
                              <Clock
                                 className={cn(
                                    'h-4 w-4 mr-1',
                                    index === 0 ? 'text-gray-400' : 'text-gray-500'
                                 )}
                              />
                              <span className={index === 0 ? 'text-gray-300' : 'text-gray-600'}>
                                 Hết hạn: {formatDate(promo.endDate)}
                              </span>
                           </div>
                        </div>

                        <div
                           className={cn(
                              'flex flex-col items-center justify-center px-4 py-2 rounded-lg',
                              index === 0 ? 'bg-white/10 backdrop-blur-sm' : 'bg-gray-100'
                           )}
                        >
                           <span
                              className={cn(
                                 'text-3xl font-bold',
                                 index === 0 ? 'text-white' : 'text-gray-900'
                              )}
                           >
                              {promo.discount}%
                           </span>
                           <span
                              className={cn(
                                 'text-sm mt-1',
                                 index === 0 ? 'text-gray-300' : 'text-gray-600'
                              )}
                           >
                              Giảm giá
                           </span>
                        </div>
                     </div>

                     <button
                        className={cn(
                           'mt-6 w-full py-3 rounded-lg font-medium transition-all duration-300',
                           index === 0
                              ? 'bg-white text-black hover:bg-gray-100'
                              : 'bg-black text-white hover:bg-gray-800'
                        )}
                        aria-label={`Áp dụng khuyến mãi ${promo.title}`}
                     >
                        Mua ngay
                     </button>
                  </CardContent>
               </Card>
            ))}
         </div>
      </section>
   );
};

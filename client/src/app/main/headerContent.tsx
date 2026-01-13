'use client';

import React from 'react';
import { useHeaderContent } from '@/hooks/useHeaderContent';
import { SearchHero } from '@/app/main/components/SearchHero';
import { CategoryGrid } from '@/app/main/components/CategoryGrid';
import { PromotionBanner } from '@/app/main/components/PromotionBanner';
import { StatsBar } from '@/app/main/components/StatsBar';

export const HeaderContent: React.FC = () => {
   const { categories, promotions, stats } = useHeaderContent();

   return (
      <header className="w-full bg-white" role="banner" aria-label="Nội dung chính trang chủ">
         <div className="container mx-auto px-4 py-8">
            {/* Schema.org structured data for SEO */}
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     '@context': 'https://schema.org',
                     '@type': 'WebSite',
                     name: 'Thương Mại Điện Tử',
                     url: 'https://yourdomain.com',
                     potentialAction: {
                        '@type': 'SearchAction',
                        target: 'https://yourdomain.com/search?q={search_term_string}',
                        'query-input': 'required name=search_term_string',
                     },
                     description: 'Trang thương mại điện tử với hàng ngàn sản phẩm chất lượng',
                     publisher: {
                        '@type': 'Organization',
                        name: 'Your Company',
                     },
                  }),
               }}
            />

            <div className="max-w-7xl mx-auto">
               {/* Hero Search Section */}
               <SearchHero />

               {/* Categories Grid */}
               <CategoryGrid categories={categories} />

               {/* Promotions Banner */}
               <PromotionBanner promotions={promotions} />

               {/* Stats Bar */}
               <StatsBar stats={stats} />
            </div>
         </div>
      </header>
   );
};

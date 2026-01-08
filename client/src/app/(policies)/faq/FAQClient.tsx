'use client';

import { useState, useMemo } from 'react';
import FAQSearch from './FAQSearch';
import FAQCategoryFilter from './FAQCategoryFilter';
import FAQList from './FAQList';
import { FAQStore } from '@/lib/policies/FAQ';

export default function FAQClient({ items }: { items: FAQStore[] }) {
   const [searchTerm, setSearchTerm] = useState('');
   const [activeCategory, setActiveCategory] = useState('all');
   const [openItems, setOpenItems] = useState<number[]>([]);
   const [currentPage, setCurrentPage] = useState(1);

   const ITEMS_PER_PAGE = 5;

   const filtered = useMemo(() => {
      return items.filter((item) => {
         const matchSearch =
            !searchTerm ||
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));

         const matchCategory = activeCategory === 'all' || item.category === activeCategory;

         return matchSearch && matchCategory;
      });
   }, [items, searchTerm, activeCategory]);

   const sorted = useMemo(
      () => [...filtered].sort((a, b) => b.popularity - a.popularity),
      [filtered]
   );

   return (
      <>
         <FAQSearch value={searchTerm} onChange={setSearchTerm} />

         <FAQCategoryFilter
            items={items}
            active={activeCategory}
            onChange={setActiveCategory}
            openItems={openItems}
            setOpenItems={setOpenItems}
            sortedItems={sorted}
         />

         <FAQList
            items={sorted}
            openItems={openItems}
            setOpenItems={setOpenItems}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            setSearchTerm={setSearchTerm}
         />
      </>
   );
}

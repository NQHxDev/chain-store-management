import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import FAQItem from './FAQItem';
import { FAQStore } from '@/lib/policies/FAQ';

type Props = {
   items: FAQStore[];
   openItems: number[];
   setOpenItems: (ids: number[]) => void;
   currentPage: number;
   setCurrentPage: (p: number) => void;
   itemsPerPage: number;
   setSearchTerm: (s: string) => void;
};

export default function FAQList({
   items,
   openItems,
   setOpenItems,
   currentPage,
   setCurrentPage,
   itemsPerPage,
   setSearchTerm,
}: Props) {
   const start = (currentPage - 1) * itemsPerPage;
   const paged = items.slice(start, start + itemsPerPage);
   const totalPages = Math.ceil(items.length / itemsPerPage);

   const toggleItem = (id: number) => {
      setOpenItems(openItems.includes(id) ? openItems.filter((i) => i !== id) : [...openItems, id]);
   };

   return (
      <>
         <div className="space-y-4 min-h-110 transition-all duration-300">
            {paged.length > 0 ? (
               paged.map((item) => (
                  <FAQItem
                     key={item.id}
                     item={item}
                     isOpen={openItems.includes(item.id)}
                     onToggle={() => toggleItem(item.id)}
                  />
               ))
            ) : (
               <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                  <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                     <FaSearch className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                     Không tìm thấy câu hỏi phù hợp
                  </h3>
                  <p className="text-gray-500 text-sm max-w-75 text-center">
                     Rất tiếc, chúng tôi không tìm thấy kết quả cho từ khóa của bạn. Vui lòng thử
                     lại với từ khóa khác hoặc xóa bộ lọc.
                  </p>

                  <button
                     onClick={() => {
                        setSearchTerm('');
                     }}
                     className="mt-6 px-5 py-2 text-sm font-semibold bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                     Xóa tìm kiếm
                  </button>
               </div>
            )}
         </div>

         {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
               <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
               >
                  <FaChevronLeft className="h-3 w-3" />
                  Trước
               </button>

               {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  return (
                     <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 text-sm rounded-lg border min-w-10 ${
                           currentPage === page
                              ? 'bg-black text-white border-black'
                              : 'bg-white hover:bg-gray-50'
                        }`}
                     >
                        {page}
                     </button>
                  );
               })}

               <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
               >
                  Sau
                  <FaChevronRight className="h-3 w-3" />
               </button>
            </div>
         )}
      </>
   );
}

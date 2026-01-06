export const dynamic = 'force-dynamic';
export const revalidate = 0;

import RefundHeroBanner from './HeroBanner';
import RefundTabs from './RefundTabs';
import RefundPolicySection from './sections/PolicySection';
import RefundCasesSection from './sections/CasesSection';
import RefundFAQSection from './sections/FAQSection';
import RefundProcessSection from './sections/ProcessSection';

export async function generateMetadata({
   searchParams,
}: {
   searchParams: Promise<{ tab?: string }> | { tab?: string };
}) {
   let tab = 'policy';

   if (searchParams instanceof Promise) {
      const resolved = await searchParams;
      tab = resolved.tab ?? 'policy';
   } else {
      tab = searchParams.tab ?? 'policy';
   }

   const titles = {
      policy: 'Chính sách hoàn tiền - Điều khoản và quy định',
      process: 'Quy trình hoàn tiền - Hướng dẫn từng bước',
      cases: 'Ví dụ hoàn tiền - Tình huống thực tế',
      faq: 'Câu hỏi thường gặp về hoàn tiền',
   };

   return {
      title: titles[tab as keyof typeof titles] || titles.policy,
      description: 'Thông tin chi tiết về chính sách hoàn tiền, quy trình và hướng dẫn.',
   };
}

export default async function RefundPage({
   searchParams,
}: {
   searchParams: Promise<{ tab?: string }> | { tab?: string };
}) {
   let tab = 'policy';

   if (searchParams instanceof Promise) {
      const resolved = await searchParams;
      tab = resolved.tab ?? 'policy';
   } else {
      tab = searchParams.tab ?? 'policy';
   }

   return (
      <>
         <h1 className="text-3xl font-bold mb-2 text-gray-900">
            {tab === 'policy' && 'Chính sách hoàn tiền'}
            {tab === 'process' && 'Quy trình hoàn tiền'}
            {tab === 'cases' && 'Ví dụ về hoàn tiền'}
            {tab === 'faq' && 'Câu hỏi thường gặp về hoàn tiền'}
         </h1>
         <p className="text-gray-500 mb-8">
            {tab === 'policy' && 'Quy định và hướng dẫn hoàn tiền chi tiết'}
            {tab === 'process' && 'Hướng dẫn từng bước thực hiện hoàn tiền'}
            {tab === 'cases' && 'Các tình huống hoàn tiền thực tế và giải pháp'}
            {tab === 'faq' && 'Giải đáp các thắc mắc thường gặp về hoàn tiền'}
         </p>

         <RefundHeroBanner />
         <RefundTabs activeTab={tab} />

         {/* Render tất cả sections nhưng ẩn hiện bằng CSS - TỐT CHO SEO */}
         <div className="space-y-12">
            <div className={tab === 'policy' ? 'block' : 'hidden'}>
               <RefundPolicySection />
            </div>
            <div className={tab === 'process' ? 'block' : 'hidden'}>
               <RefundProcessSection />
            </div>
            <div className={tab === 'cases' ? 'block' : 'hidden'}>
               <RefundCasesSection />
            </div>
            <div className={tab === 'faq' ? 'block' : 'hidden'}>
               <RefundFAQSection />
            </div>
         </div>
      </>
   );
}

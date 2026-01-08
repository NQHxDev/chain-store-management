import { FaCheckCircle, FaQuestionCircle, FaTimesCircle } from 'react-icons/fa';

import type { StorePolicy } from '@/lib/policies/StorePolicy';
import IConMaps from '@/lib/iconMap';

interface PolicyCardProps {
   policy: StorePolicy;
   showAll: boolean;
   onToggle: () => void;
}

export default function PolicyCard({ policy, showAll, onToggle }: PolicyCardProps) {
   const IconComponent = IConMaps[policy.icon] ?? FaQuestionCircle;

   return (
      <div className="bg-white border rounded-2xl p-6">
         <div className="flex gap-4 mb-4">
            <IconComponent className="h-6 w-6" />
            <h3 className="font-bold">{policy.title}</h3>
         </div>

         {policy.details.slice(0, showAll ? policy.details.length : 3).map((d, i) => (
            <div key={i} className="flex gap-2 text-sm">
               {d.includes('không') ? <FaTimesCircle /> : <FaCheckCircle />}
               {d}
            </div>
         ))}

         {policy.details.length > 3 && (
            <button onClick={onToggle} className="text-sm font-bold mt-3">
               {showAll ? 'Thu gọn' : 'Xem thêm'}
            </button>
         )}
      </div>
   );
}

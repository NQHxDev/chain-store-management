import { FaSearch } from 'react-icons/fa';

type Props = {
   value: string;
   onChange: (v: string) => void;
};

export default function FAQSearch({ value, onChange }: Props) {
   return (
      <div className="mb-6">
         <div className="relative">
            <input
               value={value}
               onChange={(e) => onChange(e.target.value)}
               placeholder="Tìm kiếm câu hỏi..."
               className="w-full px-6 py-4 pl-14 text-lg bg-white border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none transition-all"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
               <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
         </div>
      </div>
   );
}

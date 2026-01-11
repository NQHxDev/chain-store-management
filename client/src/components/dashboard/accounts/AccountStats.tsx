import { Users, UserCheck, UserX, Activity } from 'lucide-react';

const stats = [
   {
      name: 'Tổng số người dùng',
      value: '2,345',
      icon: Users,
      change: '+12.5%',
      color: 'bg-blue-50 text-blue-700',
   },
   {
      name: 'Đã xác thực',
      value: '1,890',
      icon: UserCheck,
      change: '+8.2%',
      color: 'bg-green-50 text-green-700',
   },
   {
      name: 'Chưa xác thực',
      value: '455',
      icon: UserX,
      change: '-3.1%',
      color: 'bg-yellow-50 text-yellow-700',
   },
   {
      name: 'Hoạt động hôm nay',
      value: '689',
      icon: Activity,
      change: '+5.4%',
      color: 'bg-purple-50 text-purple-700',
   },
];

export default function AccountStats() {
   return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
         {stats.map((stat) => (
            <div
               key={stat.name}
               className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
               <div className="flex items-center justify-between">
                  <div className={stat.color}>
                     <stat.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                     <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                     <p className="text-sm font-medium text-gray-500 mt-1">
                        <span
                           className={
                              stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                           }
                        >
                           {stat.change}
                        </span>{' '}
                        so với tháng trước
                     </p>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}

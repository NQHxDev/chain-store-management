'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, CheckCircle, PauseCircle, Globe } from 'lucide-react';

interface BrandStatsProps {
   stats: {
      total: number;
      active: number;
      inactive: number;
      international: number;
   };
}

export function BrandStats({ stats }: BrandStatsProps) {
   const statCards = [
      {
         title: 'Tổng thương hiệu',
         value: stats.total,
         icon: Building2,
         color: 'bg-gray-900',
         textColor: 'text-white',
      },
      {
         title: 'Đang hoạt động',
         value: stats.active,
         icon: CheckCircle,
         color: 'bg-white',
         textColor: 'text-gray-900',
         borderColor: 'border-gray-200',
      },
      {
         title: 'Ngừng hoạt động',
         value: stats.inactive,
         icon: PauseCircle,
         color: 'bg-white',
         textColor: 'text-gray-900',
         borderColor: 'border-gray-200',
      },
      {
         title: 'Quốc tế',
         value: stats.international,
         icon: Globe,
         color: 'bg-white',
         textColor: 'text-gray-900',
         borderColor: 'border-gray-200',
      },
   ];

   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         {statCards.map((card, index) => (
            <Card
               key={index}
               className={`${card.color} ${
                  card.borderColor ? `border ${card.borderColor}` : ''
               } shadow-sm transition-all hover:shadow-md`}
            >
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${card.textColor}`}>
                     {card.title}
                  </CardTitle>
                  <card.icon className={`h-4 w-4 ${card.textColor}`} />
               </CardHeader>
               <CardContent>
                  <div className={`text-2xl font-bold ${card.textColor}`}>{card.value}</div>
                  <p className={`text-xs ${card.textColor} opacity-80`}>
                     {index === 0 ? 'Tổng số thương hiệu' : 'thương hiệu'}
                  </p>
               </CardContent>
            </Card>
         ))}
      </div>
   );
}

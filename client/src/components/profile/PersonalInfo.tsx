'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { CalendarRangeIcon } from 'lucide-react';
import { UserProfile } from '@/lib/account/Profile';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Account } from '@/lib/account/Account';
import { cn } from '@/lib/utils';

interface PersonalInfoProps {
   profile: UserProfile | null;
   account: Account | null;
}

export default function PersonalInfo({ profile, account }: PersonalInfoProps) {
   const [dateOfBirth, setDateOfBirth] = useState<Date>();

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <Label htmlFor="name" className="text-gray-700">
                  Họ và tên *
               </Label>
               <Input
                  id="name"
                  defaultValue={profile?.name || 'Nguyễn Văn A'}
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
               />
            </div>

            <div className="space-y-2">
               <Label htmlFor="gender" className="text-gray-700">
                  Giới tính
               </Label>
               <Select defaultValue={profile?.gender || 'unknown'}>
                  <SelectTrigger className="border-gray-300 focus:border-gray-900 focus:ring-gray-900">
                     <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                     <SelectItem value="male">Nam</SelectItem>
                     <SelectItem value="female">Nữ</SelectItem>
                     <SelectItem value="unknown">Khác</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="space-y-2">
               <Label htmlFor="date" className="text-gray-700">
                  Ngày sinh
               </Label>
               <Popover>
                  <PopoverTrigger asChild>
                     <Button
                        variant="outline"
                        id="date"
                        className={cn(
                           'w-full justify-between items-center text-left font-normal border-gray-300', // Changed justify-start to justify-between
                           !dateOfBirth && 'text-gray-500'
                        )}
                     >
                        <span className={!dateOfBirth ? 'text-gray-500' : 'text-gray-900'}>
                           {dateOfBirth ? format(dateOfBirth, 'dd/MM/yyyy') : 'Chọn ngày sinh'}
                        </span>
                        <CalendarRangeIcon className="h-4 w-4 text-gray-500" />
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                     <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        captionLayout="dropdown"
                        onSelect={setDateOfBirth}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                     />
                  </PopoverContent>
               </Popover>
            </div>

            <div className="space-y-2">
               <Label htmlFor="email" className="text-gray-700">
                  Email *
               </Label>
               <Input
                  id="email"
                  type="email"
                  defaultValue={account ? account.email : 'example@gmail.com'}
                  disabled
                  className="bg-gray-50 border-gray-300 text-gray-500"
               />
               <p className="text-sm text-gray-500">Email không thể thay đổi</p>
            </div>
         </div>

         <div className="space-y-2">
            <Label htmlFor="bio" className="text-gray-700">
               Giới thiệu bản thân
            </Label>
            <textarea
               id="bio"
               rows={3}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
               placeholder="Giới thiệu ngắn về bản thân..."
            />
         </div>
      </div>
   );
}

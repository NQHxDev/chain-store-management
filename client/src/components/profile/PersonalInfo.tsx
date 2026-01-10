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
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserProfile } from '@/lib/account/Profile';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface PersonalInfoProps {
   profile: UserProfile;
}

export default function PersonalInfo({ profile }: PersonalInfoProps) {
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
                  defaultValue={profile.name}
                  className="border-gray-300 focus:border-gray-900 focus:ring-gray-900"
               />
            </div>

            <div className="space-y-2">
               <Label htmlFor="gender" className="text-gray-700">
                  Giới tính
               </Label>
               <Select defaultValue={profile.gender}>
                  <SelectTrigger className="border-gray-300 focus:border-gray-900 focus:ring-gray-900">
                     <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="male">Nam</SelectItem>
                     <SelectItem value="female">Nữ</SelectItem>
                     <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            <div className="space-y-2">
               <Label htmlFor="dob" className="text-gray-700">
                  Ngày sinh
               </Label>
               <Popover>
                  <PopoverTrigger asChild>
                     <Button
                        variant="outline"
                        className={cn(
                           'w-full justify-start text-left font-normal border-gray-300',
                           !dateOfBirth && 'text-gray-500'
                        )}
                     >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, 'dd/MM/yyyy') : 'Chọn ngày sinh'}
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                     <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        initialFocus
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
                  defaultValue={profile.email}
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

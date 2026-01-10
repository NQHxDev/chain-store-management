'use client';

import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import SecuritySection from './SecuritySection';
import { Button } from '@/components/ui/button';
import { Save, User, Phone, Shield } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export default function ProfileForm() {
   const { profile, isLoading } = useProfile();
   const [activeSection, setActiveSection] = useState<'personal' | 'contact' | 'security'>(
      'personal'
   );

   if (isLoading) {
      return <div>Loading...</div>;
   }

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
         {/* Navigation Tabs */}
         <div className="border-b border-gray-200">
            <nav className="flex space-x-2 px-6 pt-4" aria-label="Tabs">
               <Button
                  variant={activeSection === 'personal' ? 'default' : 'ghost'}
                  className={`gap-2 ${
                     activeSection === 'personal'
                        ? 'bg-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection('personal')}
               >
                  <User className="w-4 h-4" />
                  Thông tin cá nhân
               </Button>
               <Button
                  variant={activeSection === 'contact' ? 'default' : 'ghost'}
                  className={`gap-2 ${
                     activeSection === 'contact'
                        ? 'bg-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection('contact')}
               >
                  <Phone className="w-4 h-4" />
                  Liên hệ
               </Button>
               <Button
                  variant={activeSection === 'security' ? 'default' : 'ghost'}
                  className={`gap-2 ${
                     activeSection === 'security'
                        ? 'bg-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection('security')}
               >
                  <Shield className="w-4 h-4" />
                  Bảo mật
               </Button>
            </nav>
         </div>

         {/* Form Content */}
         <div className="p-6">
            {activeSection === 'personal' && profile && <PersonalInfo profile={profile} />}
            {activeSection === 'contact' && profile && <ContactInfo profile={profile} />}
            {activeSection === 'security' && profile && <SecuritySection profile={profile} />}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
               <Button className="gap-2 bg-gray-900 hover:bg-gray-800">
                  <Save className="w-4 h-4" />
                  Lưu thay đổi
               </Button>
            </div>
         </div>
      </div>
   );
}

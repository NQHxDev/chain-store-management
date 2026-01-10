'use client';

import { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import ContactInfo from './ContactInfo';
import SecuritySection from './SecuritySection';
import { Button } from '@/components/ui/button';
import { Save, User, Phone, Shield } from 'lucide-react';
import { useProfileStore } from '@/stores/profileStore';
import { useAuthStore } from '@/stores/authStore';

export default function ProfileForm() {
   const { userProfile, loading } = useProfileStore();
   const { account, hydrated } = useAuthStore();
   const [activeSection, setActiveSection] = useState<'personal' | 'contact' | 'security'>(
      'personal'
   );

   if (loading && !hydrated) {
      return <div>Loading...</div>;
   }

   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
         {/* Navigation Tabs */}
         <div className="border-b border-gray-200">
            <nav className="flex items-center space-x-5 px-6 py-3" aria-label="Tabs">
               <Button
                  variant={activeSection === 'personal' ? 'default' : 'ghost'}
                  className={`gap-2 flex items-center justify-center ${
                     activeSection === 'personal'
                        ? 'bg-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection('personal')}
               >
                  <User className="w-4 h-4 shrink-0" />{' '}
                  <span className="leading-none">Thông tin cá nhân</span>{' '}
               </Button>

               <Button
                  variant={activeSection === 'contact' ? 'default' : 'ghost'}
                  className={`gap-2 flex items-center justify-center ${
                     activeSection === 'contact'
                        ? 'bg-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection('contact')}
               >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span className="leading-none">Liên hệ</span>
               </Button>

               <Button
                  variant={activeSection === 'security' ? 'default' : 'ghost'}
                  className={`gap-2 flex items-center justify-center ${
                     activeSection === 'security'
                        ? 'bg-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection('security')}
               >
                  <Shield className="w-4 h-4 shrink-0" />
                  <span className="leading-none">Bảo mật</span>
               </Button>
            </nav>
         </div>

         {/* Form Content */}
         <div className="p-6">
            {activeSection === 'personal' && userProfile && (
               <PersonalInfo profile={userProfile} account={account} />
            )}
            {activeSection === 'contact' && userProfile && <ContactInfo profile={userProfile} />}
            {activeSection === 'security' && userProfile && (
               <SecuritySection profile={userProfile} />
            )}

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

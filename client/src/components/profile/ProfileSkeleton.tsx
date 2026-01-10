export default function ProfileSkeleton() {
   return (
      <div className="animate-pulse">
         <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="space-y-4">
                  <div className="h-64 bg-gray-200 rounded-xl"></div>
               </div>
               <div className="lg:col-span-2 space-y-4">
                  <div className="h-96 bg-gray-200 rounded-xl"></div>
               </div>
            </div>
         </div>
      </div>
   );
}

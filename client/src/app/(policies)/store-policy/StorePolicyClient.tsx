'use client';

import { useState, useMemo } from 'react';
import CategoryFilter from './CategoryFilter';
import PolicyCard from './PolicyCard';

import type { StorePolicy, ShippingMethod, SupportChannel } from '@/lib/policies/StorePolicy';

interface StorePolicyClientProps {
   policies: StorePolicy[];
   shippingMethods: ShippingMethod[];
   supportChannels: SupportChannel[];
}

export default function StorePolicyClient({ policies }: StorePolicyClientProps) {
   const [activeCategory, setActiveCategory] = useState('all');
   const [showAllDetails, setShowAllDetails] = useState(false);

   const filteredPolicies = useMemo(() => {
      if (activeCategory === 'all') return policies;
      return policies.filter((p) => p.category === activeCategory);
   }, [activeCategory, policies]);

   return (
      <>
         <CategoryFilter
            policies={policies}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
         />

         <div className="grid md:grid-cols-2 mb-10 gap-6">
            {filteredPolicies.map((policy) => (
               <PolicyCard
                  key={policy.id}
                  policy={policy}
                  showAll={showAllDetails}
                  onToggle={() => setShowAllDetails((v) => !v)}
               />
            ))}
         </div>
      </>
   );
}

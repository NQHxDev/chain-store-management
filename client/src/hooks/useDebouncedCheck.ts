import { useState, useRef, useEffect, useCallback } from 'react';
import axiosClient from '@/lib/axios';
import axios from 'axios';

export function useDebouncedCheck(value: string, apiUrl: string, delay: number = 500) {
   const [available, setAvailable] = useState<boolean | null>(null);
   const [checking, setChecking] = useState(false);

   const lastCheckedValueRef = useRef<string | null>(null);

   useEffect(() => {
      const trimmedValue = value.trim();
      if (!trimmedValue) {
         setAvailable(null);
         setChecking(false);
         return;
      }

      if (trimmedValue === lastCheckedValueRef.current) return;

      const controller = new AbortController();
      const timeoutId = setTimeout(async () => {
         setChecking(true);
         try {
            const res = await axiosClient.get(apiUrl, {
               params: { identifier: trimmedValue },
               signal: controller.signal,
            });

            const isAvailable = Boolean(res.data?.available);
            setAvailable(isAvailable);
            lastCheckedValueRef.current = trimmedValue;
         } catch (err) {
            if (!axios.isCancel(err)) {
               console.error('Check identifier error:', err);
               setAvailable(null);
            }
         } finally {
            if (!controller.signal.aborted) {
               setChecking(false);
            }
         }
      }, delay);

      return () => {
         clearTimeout(timeoutId);
         controller.abort();
      };
   }, [value, apiUrl, delay]);

   const reset = useCallback(() => {
      setAvailable(null);
      setChecking(false);
      lastCheckedValueRef.current = null;
   }, []);

   return { available, checking, reset };
}

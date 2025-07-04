'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabase';

export function useCurrentUser() {
  const [user, setUser] = useState<any | null>(null);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
      setLoadingAdmin(false);
    };
    getUser();
  }, []);

  return { user, loadingAdmin, isAdmin: user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL };
}

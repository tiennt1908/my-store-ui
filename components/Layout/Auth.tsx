'use client';

import { usePushRoute } from '@/customHooks/usePushRoute';
import { RootState } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  children: ReactNode;
};

export default function Auth({ children }: Props) {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.info);
  const router = useRouter();

  const requireNotLogin: string[] = ['/login', '/register'];
  const requireLogin: string[] = ['/user'];

  useEffect(() => {
    if (user.isLoaded && user.id > 0) {
      if (requireNotLogin.indexOf(pathname) > -1) {
        return router.push('/');
      }
    }

    if (user.isLoaded && user.id === 0) {
      if (requireLogin.indexOf(pathname) > -1) {
        return router.push('/login');
      }
    }
  }, [user.isLoading, pathname]);

  return children;
}

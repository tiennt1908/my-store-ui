'use client';

import { usePushURL } from '@/customHooks/usePushURL';
import { RootState } from '@/redux/store';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  children: ReactNode;
};

export default function Auth({ children }: Props) {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.info);
  const router = usePushURL();

  const requireNotLogin: string[] = ['/login', '/register'];
  const requireLogin: string[] = ['/user'];

  useEffect(() => {
    if (user.isLoaded && user.id > 0) {
      if (requireNotLogin.indexOf(pathname) > -1) {
        return router.gotoURL('/');
      }
    }

    if (user.isLoaded && user.id === 0) {
      if (requireLogin.indexOf(pathname) > -1) {
        return router.gotoURL('/login');
      }
    }
  }, [user.isLoading, pathname]);

  return children;
}

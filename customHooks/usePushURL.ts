import { actSetRouterStatus } from '@/redux/slices/ui.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const usePushURL = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const pathname = usePathname();

  const routerListeners = useSelector((state: RootState) => state.ui.routerListeners);

  const gotoURL = (path: string) => {
    dispatch(actSetRouterStatus({ isCompleted: false }));
    router.push(path);
  };

  useEffect(() => {
    if (pathname && !routerListeners.isCompleted) {
      dispatch(actSetRouterStatus({ isCompleted: true }));
    }
  }, [pathname, routerListeners.isCompleted]);

  return { gotoURL };
};

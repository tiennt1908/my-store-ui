import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const usePushRoute = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [point, setPoint] = useState(0);

  const pushRoute = (path: string) => {
    setLoading(true);
    setPoint(1);
    router.push(path);
  };

  useEffect(() => {
    setLoading(false);
    if (isLoading && point === 1) {
      setPoint(2);
    }
  }, [pathname, searchParams]);

  return { isLoading, pushRoute, isCompleted: point === 2 };
};

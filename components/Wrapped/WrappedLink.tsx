'use client';

import { actSetRouterStatus } from '@/redux/slices/ui.slice';
import { AppDispatch, RootState } from '@/redux/store';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  href?: string;
  children: ReactNode;
  [key: string]: unknown;
};

export default function WrappedLink({ href, children, ...restProps }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const handleEmitRouteStart = () => {
    dispatch(actSetRouterStatus({ isCompleted: false }));
  };

  if (!href) {
    return children;
  }
  return (
    <Link href={href} onClick={handleEmitRouteStart} {...restProps}>
      {children}
    </Link>
  );
}

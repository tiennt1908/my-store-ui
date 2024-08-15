'use client';

import { ReactNode, Suspense } from 'react';

type Props = {
  children: ReactNode;
};

export default function Body({ children }: Props) {
  return (
    <body className="bg-slate-100" style={{ minWidth: 1280 }}>
      {children}
    </body>
  );
}

'use client';

import React, { ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

export default function Body({ children }: Props) {
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    const timeOutOpacity = setTimeout(() => {
      setIsShow(true);
    }, 500);

    return () => {
      clearTimeout(timeOutOpacity);
    };
  }, []);

  return (
    <body className="bg-slate-100 transition-opacity duration-500" style={{ minWidth: 1280, opacity: isShow ? 1 : 0 }}>
      {children}
    </body>
  );
}

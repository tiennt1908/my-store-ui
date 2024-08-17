import React, { ReactNode } from 'react';

type Props = {
  className?: string;
  [key: string]: unknown;
  children: ReactNode;
};

export default function SpacingText({ className, children, ...restProps }: Props) {
  return (
    <div className={`flex justify-between items-center ${className ? className : ''}`} {...restProps}>
      {children}
    </div>
  );
}

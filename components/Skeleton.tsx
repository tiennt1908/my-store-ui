import React from 'react';

type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
};

export default function Skeleton({ width = '100%', height = '100%', className }: Props) {
  let classNameSkeleton = 'bg-slate-100';

  if (className) {
    classNameSkeleton = `${classNameSkeleton} ${className}`;
  }

  return <div className={classNameSkeleton} style={{ width, height }} />;
}

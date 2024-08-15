import React from 'react';
import Skeleton from './Skeleton';

type Props = {
  [key: string]: unknown;
};

export default function ProductSkeleton({ ...restProps }: Props) {
  return (
    <div {...restProps}>
      <div className="overflow-hidden w-full flex justify-center items-center" style={{ height: 280 }}>
        <Skeleton />
      </div>
      <div className="mt-2 flex flex-col gap-2" style={{ height: 72 }}>
        <Skeleton width={90} height="calc((100% + 16px) / 3)" />
        <div className="flex gap-2" style={{ height: 'calc((100% + 16px) / 3)' }}>
          <Skeleton width={90} />
          <Skeleton width={90} />
        </div>
        <div className="flex justify-between gap-2" style={{ height: 'calc((100% + 16px) / 3)' }}>
          <Skeleton width={40} />
          <Skeleton width={60} />
        </div>
      </div>
    </div>
  );
}

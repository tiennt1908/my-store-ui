import Skeleton from '@/components/Skeleton';
import React from 'react';

type Props = {};

export default function CategorySkeleton({}: Props) {
  return (
    <div className="bg-white rounded shadow-sm">
      <p className="px-3 font-medium py-3 text-base border-b">Danh mục sản phẩm</p>
      <div className="py-3">
        <div className="py-2 px-3">
          <Skeleton width="20%" height={20} />
        </div>
        <div className="py-2 px-3">
          <Skeleton width="30%" height={20} />
        </div>
        <div className="py-2 px-3">
          <Skeleton width="70%" height={20} />
        </div>
        <div className="py-2 px-3">
          <Skeleton width="40%" height={20} />
        </div>
        <div className="py-2 px-3">
          <Skeleton width="60%" height={20} />
        </div>
        <div className="py-2 px-3">
          <Skeleton width="70%" height={20} />
        </div>
        <div className="py-2 px-3">
          <Skeleton width="50%" height={20} />
        </div>
        <div className="py-2 px-3">
          <Skeleton width="35%" height={20} />
        </div>
      </div>
    </div>
  );
}

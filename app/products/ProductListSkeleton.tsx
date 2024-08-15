import ProductSkeleton from '@/components/ProductSkeleton';
import React from 'react';

type Props = {};

export default function ProductListSkeleton({}: Props) {
  return (
    <div className="w-full grid grid-cols-12 gap-2">
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />

      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />

      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
      <ProductSkeleton className="col-span-3 bg-white p-2 rounded shadow-sm" />
    </div>
  );
}

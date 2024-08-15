import React from 'react';

type Props = {
  [key: string]: unknown;
};

export default function ProductSkeleton({ ...restProps }: Props) {
  return (
    <div {...restProps}>
      <div className="overflow-hidden w-full flex justify-center items-center bg-slate-100" style={{ height: 280 }}></div>
      <div className="mt-2 flex flex-col gap-2" style={{ height: 72 }}>
        <div className="bg-slate-100 w-full" style={{ height: 'calc((100% + 16px) / 3)' }} />
        <div className="flex gap-2" style={{ height: 'calc((100% + 16px) / 3)' }}>
          <div className="bg-slate-100" style={{ width: 80 }} />
          <div className="bg-slate-100" style={{ width: 80 }} />
        </div>
        <div className="flex justify-between gap-2" style={{ height: 'calc((100% + 16px) / 3)' }}>
          <div className="bg-slate-100" style={{ width: 40 }} />
          <div className="bg-slate-100" style={{ width: 60 }} />
        </div>
      </div>
    </div>
  );
}

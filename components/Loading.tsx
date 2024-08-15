import React from 'react';
import SpinIcon from './Icons/SpinIcon';

type Props = {
  [key: string]: unknown;
};

export default function Loading({ ...restProps }: Props) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <SpinIcon className="w-6 text-slate-500" {...restProps} />
    </div>
  );
}

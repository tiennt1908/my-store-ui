import React from 'react';

type Props = {
  width?: number | string;
  height?: number | string;
};

export default function Skeleton({ width = '100%', height = '100%' }: Props) {
  return <div className="bg-slate-100" style={{ width, height }} />;
}

'use client';
import Empty from '@/components/Empty';
import React from 'react';

type Props = {};

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="bg-white rounded shadow-sm flex justify-center items-center font-medium">Không tìm thấy thông tin</div>;
}

'use client';

import Button from '@/components/Button';
import { LinkSlashIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type Props = {};

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex justify-center items-center font-medium">
      <div className="bg-white rounded shadow-sm flex justify-center items-center" style={{ width: 450, height: 300 }}>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <SignalSlashIcon className="w-14 text-slate-300" />
          </div>
          <div>
            <p className="text-center font-medium text-lg">Lỗi 404</p>
            <p className="text-base">Không tìm thấy thông tin sản phẩm</p>
          </div>
          <Link href="/">
            <Button theme="black" shadow="none" width="100%">
              Trang Chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Button from '@/components/Button';
import WrappedLink from '@/components/Wrapped/WrappedLink';
import Link from 'next/link';
import React from 'react';

type Props = {
  orderId: number;
  totalPayment: number;
};

export default function OrderFooter({ orderId, totalPayment }: Props) {
  return (
    <div className="p-4 flex justify-between items-center">
      <WrappedLink href={`/order/${orderId}`}>
        <Button theme="none" shadow="none" borderColor="black" borderWidth="1">
          Xem chi tiết đơn hàng
        </Button>
      </WrappedLink>
      <div>
        <p className="font-medium">
          Thành Tiền: <span>{totalPayment}đ</span>
        </p>
      </div>
    </div>
  );
}

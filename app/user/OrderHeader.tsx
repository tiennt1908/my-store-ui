import React from 'react';

type Props = {
  orderId: number;
  statusName: string;
};

export default function OrderHeader({ orderId, statusName }: Props) {
  return (
    <div className="flex justify-between p-4 border-b font-medium">
      <p>Đơn Hàng #{orderId}</p>
      <p className="text-red-500">{statusName}</p>
    </div>
  );
}

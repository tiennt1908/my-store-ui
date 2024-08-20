'use client';

import Button from '@/components/Button';
import OrderItem from '@/components/Pages/OrderItem';
import RenderIf from '@/components/RenderIf';
import SpacingText from '@/components/SpacingText';
import { actionAsyncGetItemByOrderIds } from '@/redux/slices/order.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  params: { id: string };
};

export default function OrderDetail({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const mapItem = useSelector((state: RootState) => state.order.mapItem);
  const orderId: number = parseInt(params.id) || 0;

  useEffect(() => {
    if (orderId) {
      dispatch(actionAsyncGetItemByOrderIds({ ids: [orderId] }));
    }
  }, [orderId]);

  const order = mapItem[orderId];
  const orderItems = order?.items || [];

  const totalProductValue = orderItems.reduce((accum, e) => {
    return accum + e.price * e.amount;
  }, 0);
  const totalProductFinalValue = orderItems.reduce((accum, e) => {
    return accum + e.finalPrice * e.amount;
  }, 0);
  const totalSaleValue = totalProductValue - totalProductFinalValue;
  const productCount = orderItems.reduce((accum, e) => {
    return accum + e.amount;
  }, 0);

  return (
    <div>
      <RenderIf isRender={!mapItem.isLoading}>
        {order && (
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-medium">Đơn hàng #{order.id}</h1>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <div className="bg-white rounded shadow-sm">
                  {orderItems.map((i) => {
                    return (
                      <OrderItem
                        key={i.id}
                        id={i.id}
                        slug={i.slug}
                        imageIndex={i.imageIndex}
                        name={i.name}
                        properties={i.properties}
                        price={i.price}
                        finalPrice={i.finalPrice}
                        amount={i.amount}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4">
                  <p className="text-center font-medium">Thông tin thanh toán</p>
                  <div className="flex flex-col gap-2">
                    <SpacingText>
                      <p>Giá trị đơn hàng:</p>
                      <p className="font-medium">{totalProductValue}đ</p>
                    </SpacingText>
                    <SpacingText>
                      <p>Số lượng:</p>
                      <p className="font-medium">{productCount}</p>
                    </SpacingText>
                    <SpacingText className="text-red-500">
                      <p>Giảm giá:</p>
                      <p className="font-medium">
                        <RenderIf isRender={totalProductValue > 0}>-</RenderIf>
                        {totalSaleValue}đ
                      </p>
                    </SpacingText>
                    <SpacingText className="font-medium">
                      <p>Thành tiền:</p>
                      <p className="text-lg">{totalProductFinalValue}đ</p>
                    </SpacingText>
                  </div>
                </div>
                <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4">
                  <p className="text-center font-medium">Thông tin nhận hàng</p>
                  <div className="flex flex-col gap-2">
                    <SpacingText className="gap-4">
                      <p>Họ Tên:</p>
                      <p className="font-medium">{order.recipientName}</p>
                    </SpacingText>
                    <SpacingText className="gap-4">
                      <p>SĐT người nhận:</p>
                      <p className="font-medium">{order.phoneNumber}</p>
                    </SpacingText>
                    <SpacingText className="gap-4">
                      <p className="whitespace-nowrap">Địa chỉ:</p>
                      <p className="font-medium">{order.address}</p>
                    </SpacingText>
                    <Button theme="black">Hủy Đơn Hàng</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </RenderIf>
    </div>
  );
}

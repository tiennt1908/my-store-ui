import Button from '@/components/Button';
import SpacingText from '@/components/SpacingText';
import React from 'react';
import { IProductCart } from '../api/product/product.output';
import { IOrderItem } from '@/redux/slices/cart.slice';
import RenderIf from '@/components/RenderIf';

type Props = {
  products: IProductCart[];
  mapItems: {
    [key: string]: IOrderItem;
  };
};

export default function TotalCart({ products, mapItems }: Props) {
  const totalProductValue = products.reduce((accum, e) => {
    return accum + e.price * (mapItems[e.id]?.amount || 0);
  }, 0);
  const totalProductSaleValue = products.reduce((accum, e) => {
    return accum + (e.isSaleOff ? e.salePrice * (mapItems[e.id]?.amount || 0) : e.price * (mapItems[e.id]?.amount || 0));
  }, 0);
  const totalSaleValue = totalProductValue - totalProductSaleValue;
  const productCount = products.reduce((accum, e) => {
    return accum + (mapItems[e.id]?.amount || 0);
  }, 0);

  return (
    <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4">
      <p className="text-center font-medium">Tổng kết giỏ hàng</p>
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
          <p className="text-lg">{totalProductSaleValue}đ</p>
        </SpacingText>
      </div>
    </div>
  );
}

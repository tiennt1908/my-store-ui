'use client';

import { actionAsyncGetCartProductDetail } from '@/redux/slices/cart.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartInfo from './CartInfo';
import Item from './Item';
import TotalCart from './TotalCart';

type Props = {};

export default function CartPage({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(actionAsyncGetCartProductDetail());
  }, []);

  const orderItems = cart.detail.list.map((e) => {
    return {
      productPropertyGroupId: e.id,
      amount: cart.mapItems[e.id]?.amount || 0,
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-medium">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="bg-white rounded shadow-sm" style={{ minHeight: 180 * 3 }}>
            {cart.detail.list.map((p) => {
              return <Item key={p.id} {...p} />;
            })}
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <TotalCart products={cart.detail.list} mapItems={cart.mapItems} />
          <CartInfo orderItems={orderItems} />
        </div>
      </div>
    </div>
  );
}

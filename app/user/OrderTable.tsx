import { actionAsyncGetItemByOrderIds, actionAsyncGetOrderList } from '@/redux/slices/order.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderRow from './OrderRow';
import Button from '@/components/Button';
import Link from 'next/link';
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline';
import WrappedLink from '@/components/Wrapped/WrappedLink';

type Props = {};

export default function OrderTable({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(actionAsyncGetOrderList({ ...order.filter, ...order.paging, ...order.sort }));
  }, []);

  useEffect(() => {
    if (order.list.length > 0) {
      const ids = order.list.map((e) => e.id);
      dispatch(actionAsyncGetItemByOrderIds({ ids }));
    }
  }, [order.list]);

  if (order.list.length === 0 && !order.isLoading) {
    return (
      <div className="bg-white rounded shadow-sm flex justify-center items-center font-medium" style={{ height: 450 }}>
        <div className="flex flex-col justify-center items-center gap-2">
          <ArchiveBoxXMarkIcon className="w-14 text-slate-300" />
          <p>Bạn chưa có đơn hàng nào</p>
          <WrappedLink href="/products">
            <Button theme="black" width={150}>
              Mua ngay
            </Button>
          </WrappedLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {order.list.map((o) => {
        return (
          <div className="bg-white rounded shadow-sm" key={o.id}>
            <OrderRow id={o.id} items={order.mapItem[o.id]?.items || []} statusName={o.statusName} />
          </div>
        );
      })}
    </div>
  );
}

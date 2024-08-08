import { actionAsyncGetItemByOrderIds, actionAsyncGetOrderList } from '@/redux/slices/order.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderRow from './OrderRow';

type Props = {};

export default function OrderTable({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(actionAsyncGetOrderList({ ...order.filter, ...order.paging, ...order.sort }));
  }, []);

  useEffect(() => {
    console.log(order.list);

    if (order.list.length > 0) {
      const ids = order.list.map((e) => e.id);
      dispatch(actionAsyncGetItemByOrderIds({ ids }));
    }
  }, [order.list]);

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

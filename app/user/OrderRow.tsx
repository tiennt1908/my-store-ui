import { IOrderItem } from '../api/order/order.output';
import OrderFooter from './OrderFooter';
import OrderHeader from './OrderHeader';
import OrderItem from '../../components/Pages/OrderItem';

type Props = {
  id: number;
  items: IOrderItem[];
  statusName: string;
};
export default function OrderRow({ id, items, statusName }: Props) {
  const totalPayment = items.reduce((accum, e) => {
    return accum + e.amount * e.finalPrice;
  }, 0);

  return (
    <div>
      <OrderHeader orderId={id} statusName={statusName} />
      <div>
        {items.map((i) => {
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
      <OrderFooter orderId={id} totalPayment={totalPayment} />
    </div>
  );
}

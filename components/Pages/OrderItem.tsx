import RenderIf from '@/components/RenderIf';
import WrappedLink from '@/components/Wrapped/WrappedLink';
import Image from 'next/image';
import { IProperty } from '../../app/api/order/order.output';
import Properties from '../../app/cart/Properties';
import { GET_IMAGE_URL_HELPER } from '../../app/lib/helper/get-image-url.helper';

type Props = {
  id: number;
  slug: string;
  imageIndex: number;
  name: string;
  properties: IProperty[];
  finalPrice: number;
  price: number;
  amount: number;
};

export default function OrderItem({ slug, imageIndex, name, properties, price, finalPrice, amount }: Props) {
  return (
    <div className="flex justify-between p-4 gap-2 border-b" style={{ height: 180 }}>
      <Image width={106.8} height={145.8} alt="s" src={GET_IMAGE_URL_HELPER('products', slug + '-' + imageIndex)} />
      <div className="flex flex-col gap-2 w-full">
        <WrappedLink href={`/products/${slug}`} className="font-medium hover:underline">
          {name}
        </WrappedLink>
        <Properties properties={properties || []} />
        <div className="flex gap-1">
          <span>Giá: {finalPrice}đ</span>
          <RenderIf isRender={price !== finalPrice}>
            <span className="text-slate-400 line-through">{price}đ</span>
          </RenderIf>
        </div>
        <div className="flex items-center gap-1">
          <p>
            Số lượng: <span className="font-medium">{amount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

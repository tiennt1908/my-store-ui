import Image from 'next/image';
import React from 'react';
import { GET_IMAGE_URL_HELPER } from '../lib/helper/get-image-url.helper';
import { IProductCart } from '../api/product/product.output';
import Link from 'next/link';
import Properties from '../cart/Properties';
import { IProperty } from '../api/order/order.output';

type Props = {
  id: number;
  slug: string;
  imageIndex: number;
  name: string;
  properties: IProperty[];
  priceAtOrder: number;
  price: number;
  amount: number;
};

export default function OrderItem({ slug, imageIndex, name, properties, price, priceAtOrder, amount }: Props) {
  return (
    <div className="flex justify-between p-4 gap-2 border-b" style={{ height: 180 }}>
      <Image width={106.8} height={145.8} alt="s" src={GET_IMAGE_URL_HELPER('products', slug + '-' + imageIndex)} />
      <div className="flex flex-col gap-2 w-full">
        <Link href={`/products/${slug}`} className="font-medium hover:underline">
          {name}
        </Link>
        <Properties properties={properties || []} />
        <p>
          Giá: {priceAtOrder}đ <span className="text-slate-400 line-through">{price}đ</span>
        </p>
        <div className="flex items-center gap-1">
          <p>
            Số lượng: <span className="font-medium">{amount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { GET_IMAGE_URL_HELPER } from '@/app/lib/helper/get-image-url.helper';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  name: string;
  slug: string;
  isSaleOff: 0 | 1;
  salePrice: number;
  price: number;
  salePercent: number;
  [key: string]: unknown;
}

export default function Product({ name, slug, isSaleOff, salePrice, price, salePercent, ...restProps }: Props) {
  return (
    <Link href={`/products/${slug}`} {...restProps}>
      <div className="overflow-hidden w-full flex justify-center items-center" style={{ height: 280 }}>
        <Image alt={name} width={250} height={250} src={GET_IMAGE_URL_HELPER('products', slug + '-0')} />
      </div>
      <div className="mt-2">
        <p className="truncate hover:underline">{name}</p>
        <div className="flex gap-2">
          <p className="font-medium">{isSaleOff ? salePrice : price}đ</p>
          {isSaleOff && <p className="font-medium text-slate-400 line-through">{price}đ</p>}
        </div>
        <p className="text-red-500">-{Math.round(salePercent)}%</p>
      </div>
    </Link>
  );
}

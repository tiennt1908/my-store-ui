import { GET_IMAGE_URL_HELPER } from '@/app/lib/helper/get-image-url.helper';
import Image from 'next/image';
import Link from 'next/link';
import RenderIf from './RenderIf';
import WrappedLink from './Wrapped/WrappedLink';

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
    <WrappedLink href={`/products/${slug}`} {...restProps}>
      <div className="overflow-hidden w-full flex justify-center items-center" style={{ height: 280 }}>
        <Image alt={name} width={250} height={250} src={GET_IMAGE_URL_HELPER('products', slug + '-0')} />
      </div>
      <div className="mt-2">
        <p className="truncate hover:underline">{name}</p>
        <div className="flex gap-2">
          <p className="font-medium">{isSaleOff ? salePrice : price}đ</p>
          <RenderIf isRender={isSaleOff === 1}>
            <p className="font-medium text-slate-400 line-through">{price}đ</p>
          </RenderIf>
        </div>
        <div>
          <RenderIf isRender={salePercent >= 0}>
            <p className="text-red-500">{-1 * Math.round(salePercent)}%</p>
          </RenderIf>
          <RenderIf isRender={salePercent < 0}>
            <p className="text-green-500">+{-1 * Math.round(salePercent)}%</p>
          </RenderIf>
        </div>
      </div>
    </WrappedLink>
  );
}

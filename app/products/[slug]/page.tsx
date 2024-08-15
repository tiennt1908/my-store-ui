'use server';

import { PRODUCT_API } from '@/app/api/product';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import { redirect } from 'next/navigation';
import RelativeProduct from './RelativeProduct';

export default async function ProductDetail({ params: { slug } }: { params: { slug: string } }) {
  const productReq = await PRODUCT_API.getProductDetail({ slug });
  const product = productReq.data;

  if (!product?.id) {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <ProductImage {...product} />
        </div>
        <div className="col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>
      <RelativeProduct categoryId={product.categoryId} />
    </div>
  );
}

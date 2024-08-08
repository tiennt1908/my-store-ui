'use server';

import { PRODUCT_API } from '@/app/api/product';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

export default async function ProductDetail({ params: { slug } }: { params: { slug: string } }) {
  const productReq = await PRODUCT_API.getProductDetail({ slug });
  const product = productReq.data;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-12 bg-white p-4 rounded gap-4 shadow-sm" style={{ height: 500 }}>
        <div className="col-span-7 border-r">
          <ProductImage {...product} />
        </div>
        <div className="col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}

'use server';

import { PRODUCT_API } from '@/app/api/product';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

export default async function ProductDetail({ params: { slug } }: { params: { slug: string } }) {
  const productReq = await PRODUCT_API.getProductDetail({ slug });
  const product = productReq.data;

  return (
    <div>
      <div className="grid grid-cols-12 gap-4" style={{ height: 1500 }}>
        <div className="col-span-7">
          <ProductImage {...product} />
        </div>
        <div className="col-span-5">
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}

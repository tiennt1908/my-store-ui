'use client';

import { PRODUCT_API } from '@/app/api/product';
import { IProduct, IProductImage } from '@/app/api/product/product.output';
import Slide from '@/components/Slide';
import { useEffect, useState } from 'react';
import Image from './Image';
import ProductThumbnail from './ProductThumbnail';

export default function ProductImage({ id, slug }: IProduct) {
  const [images, setImages] = useState<IProductImage[]>([]);

  useEffect(() => {
    if (id) {
      PRODUCT_API.getProductImages({
        productId: id,
      }).then((res) => {
        setImages(res.data || []);
      });
    }
  }, []);

  return (
    <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4">
      <Slide
        isDot={false}
        slideButtonProps={{
          rounded: 'full',
          height: 35,
          width: 35,
          darkTheme: 'none',
        }}
      >
        {images.map((e) => {
          return <Image key={e.id} url={`${slug}-${e.index}`} />;
        })}
      </Slide>
      <ProductThumbnail images={images} slug={slug} />
    </div>
  );
}

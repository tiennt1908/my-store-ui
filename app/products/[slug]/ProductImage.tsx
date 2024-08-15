'use client';

import { PRODUCT_API } from '@/app/api/product';
import { IProduct, IProductImage } from '@/app/api/product/product.output';
import RenderIf from '@/components/RenderIf';
import Slide from '@/components/Slide';
import { useEffect, useState } from 'react';
import Image from './Image';
import ProductThumbnail from './ProductThumbnail';
import Skeleton from '@/components/Skeleton';
import Thumbnail from '@/components/Thumbnail';
import ProductImageSkeleton from './ProductImageSkeleton';

export default function ProductImage({ id, slug }: IProduct) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<IProductImage[]>([]);
  const [slideNumber, setSlideNumber] = useState<number>(0);

  useEffect(() => {
    if (id) {
      setLoading(true);
      PRODUCT_API.getProductImages({
        productId: id,
      }).then((res) => {
        setLoading(false);
        setImages(res.data || []);
      });
    }
  }, []);
  const handleSetSlideNumber = (newSlideNumber: number) => {
    setSlideNumber(newSlideNumber);
  };

  return (
    <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4" style={{ height: 576.2 }}>
      <RenderIf isRender={!isLoading}>
        <Slide
          isDot={false}
          slideButtonProps={{
            rounded: 'full',
            height: 35,
            width: 35,
            darkTheme: 'none',
          }}
          gotoSlide={slideNumber}
          onSlideChange={handleSetSlideNumber}
        >
          {images.map((e) => {
            return <Image key={e.id} url={`${slug}-${e.index}`} />;
          })}
        </Slide>
        <ProductThumbnail slideNumber={slideNumber} onChangeSlide={handleSetSlideNumber} images={images} slug={slug} />
      </RenderIf>
      <RenderIf isRender={isLoading}>
        <ProductImageSkeleton />
      </RenderIf>
    </div>
  );
}

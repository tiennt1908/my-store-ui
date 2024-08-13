import { IProductImage } from '@/app/api/product/product.output';
import { GET_IMAGE_URL_HELPER } from '@/app/lib/helper/get-image-url.helper';
import Slide from '@/components/Slide';
import Thumbnail from '@/components/Thumbnail';
import React from 'react';

type Props = {
  images: IProductImage[];
  slug: string;
};

export default function ProductThumbnail({ images, slug }: Props) {
  return (
    <Thumbnail
      pxPerSlide={200}
      className="gap-2"
      slideButtonSpacingX={-10}
      slideButtonProps={{
        rounded: 'full',
        height: 25,
        width: 25,
        darkTheme: 'none',
      }}
    >
      {images.map((e, k) => {
        return (
          <div className="flex justify-center" key={k}>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                height: 75,
                width: 75,
                backgroundImage: `url("${GET_IMAGE_URL_HELPER('products', `${slug}-${e.index}`)}")`,
              }}
            />
          </div>
        );
      })}
    </Thumbnail>
  );
}

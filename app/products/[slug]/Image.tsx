import { GET_IMAGE_URL_HELPER } from '@/app/lib/helper/get-image-url.helper';
import React from 'react';

type Props = {
  url: string;
  [key: string]: unknown;
};

export default function Image({ url, ...restProps }: Props) {
  return (
    <div {...restProps}>
      <div
        className="w-full h-full bg-contain bg-center bg-no-repeat"
        style={{
          height: 450,
          backgroundImage: `url("${GET_IMAGE_URL_HELPER('products', url)}")`,
        }}
      />
    </div>
  );
}

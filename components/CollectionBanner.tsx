import { GET_IMAGE_URL_HELPER } from '@/app/lib/helper/get-image-url.helper';
import Link from 'next/link';
import React from 'react';
import Button from './Button';

type Props = {
  img: string;
  slug: string;
  name: string;
  desc: string;
};

export default function CollectionBanner({ img, slug, name, desc }: Props) {
  return (
    <Link href={`collection/${slug}`}>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          height: 500,
          backgroundImage: `url("${GET_IMAGE_URL_HELPER('collection', img)}")`,
        }}
      />
    </Link>
  );
}

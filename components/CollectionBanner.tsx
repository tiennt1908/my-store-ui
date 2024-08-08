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
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          height: 500,
          backgroundImage: `url("${GET_IMAGE_URL_HELPER('collection', img)}")`,
        }}
      />
      <div className="pt-4 pb-2">
        <div className="text-center">
          <p className="font-medium text-xl">{name}</p>
          <p className="text-slate-500 mt-2">{desc}</p>
        </div>
        <Link href={`collection/${slug}`}>
          <div className="flex justify-center mt-2">
            <Button shadow="none" theme="black">
              Explore Collection
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}

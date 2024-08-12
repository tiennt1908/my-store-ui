import React from 'react';
import { ICollection } from './api/collection/collection.output';
import CollectionBanner from '@/components/CollectionBanner';
import InfinateSlide from '@/components/InfinateSlide';

type Props = {
  collectionList: ICollection[];
};

export default function Banner({ collectionList }: Props) {
  return (
    <div className="bg-white p-2 rounded shadow-sm">
      <InfinateSlide
        slideButtonProps={{
          rounded: 'full',
          height: 40,
          width: 40,
          darkTheme: 'none',
        }}
        dotProps={{
          darkTheme: 'none',
        }}
        slideButtonSpacingX={-20}
        dotBoxSpacingY={2}
        isDot={true}
        isAuto={true}
      >
        {collectionList.map((e) => {
          return <CollectionBanner img={e.img} name={e.name} slug={e.slug} desc={e.desc} />;
        })}
      </InfinateSlide>
    </div>
  );
}

import Skeleton from '@/components/Skeleton';
import Thumbnail from '@/components/Thumbnail';
import React from 'react';

type Props = {};

export default function ProductImageSkeleton({}: Props) {
  return (
    <>
      <Skeleton height={450} />
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
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
        <Skeleton width={75} height={75} />
      </Thumbnail>
    </>
  );
}

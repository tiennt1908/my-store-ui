'use client';

import { PRODUCT_API } from '@/app/api/product';
import { IProduct } from '@/app/api/product/product.output';
import ProductListSlide from '@/components/Pages/ProductListSlide';
import RenderIf from '@/components/RenderIf';
import React, { useEffect, useState } from 'react';

type Props = {
  categoryId: number;
};

export default function RelativeProduct({ categoryId }: Props) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    PRODUCT_API.getList({
      categoryId,
      index: 0,
      limit: 10,
      sortCol: 'id',
      sortType: 'DESC',
    }).then((res) => {
      setLoading(false);
      setProducts(res.data.list);
    });
  }, []);

  return (
    <ProductListSlide
      hrefViewMore={`/products?categoryId=${categoryId}&sort=newest`}
      isLoading={isLoading}
      title="Sản Phẩm Liên Quan"
      productList={products}
    />
  );
}

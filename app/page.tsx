'use server';

import Product from '@/components/Product';
import Link from 'next/link';
import { COLLECTION_API } from './api/collection';
import { PRODUCT_API } from './api/product';
import Banner from './Banner';
import WrappedLink from '@/components/Wrapped/WrappedLink';

export default async function Home() {
  const collectionListReq = COLLECTION_API.getList({
    index: 0,
    limit: 3,
    isActive: 1,
  });
  const productListReq = PRODUCT_API.getList({
    index: 0,
    limit: 5,
    isSaleOff: 1,
    sortCol: 'salePercent',
    sortType: 'DESC',
  });

  const [collectionListRes, productListRes] = await Promise.all([collectionListReq, productListReq]);

  const collectionList = collectionListRes.data.list;

  const productList = productListRes.data.list;

  return (
    <div className="flex flex-col gap-4">
      <Banner collectionList={collectionList} />
      <div>
        <div className="bg-white rounded shadow-sm">
          <div className="flex justify-between p-4 border-b">
            <p className="text-lg font-medium text-red-500">Giảm giá nhiều nhất</p>
            <WrappedLink href="/products?sortCol=salePercent&sortType=DESC" className="font-medium">
              Xem thêm
            </WrappedLink>
          </div>
          <div className="grid grid-cols-10 gap-4 p-4">
            {productList.map(({ name, slug, isSaleOff, salePrice, price, salePercent }) => {
              return (
                <Product
                  className="col-span-2"
                  name={name}
                  slug={slug}
                  isSaleOff={isSaleOff}
                  salePrice={salePrice}
                  price={price}
                  salePercent={salePercent}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

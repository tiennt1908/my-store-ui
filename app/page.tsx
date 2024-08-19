'use server';

import ProductListSlide from '@/components/Pages/ProductListSlide';
import { COLLECTION_API } from './api/collection';
import { PRODUCT_API } from './api/product';
import { IProduct } from './api/product/product.output';
import Banner from './Banner';
import ProductListGrid from '@/components/Pages/ProductListGrid';

export default async function Home() {
  const requests: Promise<any>[] = [];
  const collectionListReq = COLLECTION_API.getList({
    index: 0,
    limit: 3,
    isActive: 1,
  });
  const productSaleOffListReq = PRODUCT_API.getList({
    index: 0,
    limit: 10,
    isSaleOff: 1,
    sortCol: 'salePercent',
    sortType: 'DESC',
  });
  const productNewestListReq = PRODUCT_API.getList({
    index: 0,
    limit: 10,
    sortCol: 'id',
    sortType: 'DESC',
  });
  const productBestSellerListReq = PRODUCT_API.getList({
    index: 0,
    limit: 4,
    sortCol: 'totalSold',
    sortType: 'DESC',
  });
  requests.push(...[collectionListReq, productSaleOffListReq, productNewestListReq, productBestSellerListReq]);

  const [collectionListRes, productSaleOffListRes, productNewestListRes, productBestSellerListRes] = await Promise.all(requests);

  const collectionList = collectionListRes.data.list;

  const productSaleOffList: IProduct[] = productSaleOffListRes.data.list;
  const productNewestList: IProduct[] = productNewestListRes.data.list;
  const productBestSellerList: IProduct[] = productBestSellerListRes.data.list;

  return (
    <div className="flex flex-col gap-4">
      <Banner collectionList={collectionList} />
      <ProductListSlide title="Top Sản Phẩm Bán Chạy" hrefViewMore="/products?sort=best_seller" productList={productBestSellerList} />
      <ProductListGrid title="Sản Phẩm Mới" productList={productNewestList} hrefViewMore="products?sort=newest" />
      <ProductListSlide
        title="Sản Phẩm Giảm Giá"
        titleColor="red"
        hrefViewMore="/products?sort=sale_off_most"
        productList={productSaleOffList}
      />
    </div>
  );
}

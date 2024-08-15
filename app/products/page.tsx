'use client';

import Paging from '@/components/Paging';
import Product from '@/components/Product';
import Select from '@/components/Select';
import { usePushURL } from '@/customHooks/usePushURL';
import { useSelect } from '@/customHooks/useSelect';
import { actionAsyncGetCategoryList } from '@/redux/slices/category.slice';
import { actionAsyncGetProductList } from '@/redux/slices/product.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryBox from './CategoryBox';
import RenderIf from '@/components/RenderIf';
import ProductListSkeleton from './ProductListSkeleton';
import CategorySkeleton from './CategorySkeleton';

type Props = {};

export default function Products({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = usePushURL();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const category = useSelector((state: RootState) => state.category);
  const product = useSelector((state: RootState) => state.product);

  const indexQuery = searchParams.get('index');
  const index = parseInt(indexQuery || '0') > 0 ? parseInt(indexQuery || '0') : 0;
  const limitQuery = searchParams.get('limit');
  const limit =
    parseInt(limitQuery || '0') > 0 && parseInt(limitQuery || '0') <= product.maxLimit ? parseInt(limitQuery || '0') : product.maxLimit;

  const sortSelect = useSelect({
    initOptionList: [
      {
        id: 'newest',
        content: 'Mới nhất',
      },
      {
        id: 'best_seller',
        content: 'Bán chạy nhất',
      },
      {
        id: 'sale_off_most',
        content: 'Giảm giá nhiều nhất',
      },
      {
        id: 'price_asc',
        content: 'Giá tăng dần',
      },
      {
        id: 'price_desc',
        content: 'Giá giảm dần',
      },
    ],
    initVal: 'best_seller',
  });

  useEffect(() => {
    const sort = searchParams.get('sort');
    const isSaleOff = searchParams.get('isSaleOff');
    const searchValue = searchParams.get('searchValue');
    const categoryId = searchParams.get('categoryId');
    const collectionId = searchParams.get('collectionId');

    const sortObject = getSortParams(sort || '');

    sortSelect.onSelect(sortObject.key);

    const input: any = {
      sortCol: sortObject.sortCol,
      sortType: sortObject.sortType,
      categoryId,
      index,
      limit,
    };

    if (isSaleOff === '0') {
      input.isSaleOff = 0;
    }

    if (isSaleOff === '1') {
      input.isSaleOff = 1;
    }

    if (searchValue) {
      input.searchValue = searchValue;
    }

    if (parseInt(categoryId || '0') > 0) {
      input.categoryId = categoryId;
    }

    if (parseInt(collectionId || '0') > 0) {
      input.collectionId = collectionId;
    }

    dispatch(actionAsyncGetProductList(input));
  }, [searchParams.toString()]);

  useEffect(() => {
    dispatch(actionAsyncGetCategoryList({ ...category.paging, ...category.filter }));
  }, []);

  const getSortParams = (key: string) => {
    const sortMap: any = {
      newest: { key: 'newest', sortCol: 'id', sortType: 'DESC' },
      sale_off_most: { key: 'sale_off_most', sortCol: 'salePercent', sortType: 'DESC' },
      price_desc: { key: 'price_desc', sortCol: 'salePrice', sortType: 'DESC' },
      price_asc: { key: 'price_asc', sortCol: 'salePrice', sortType: 'ASC' },
    };

    let sortObject = { key: 'best_seller', sortCol: 'totalSold', sortType: 'DESC' };
    if (sortMap[key]) {
      sortObject = sortMap[key];
    }

    return sortObject;
  };
  const handlePaging = (p: number) => {
    const index = (p - 1) * limit;
    const indexParams = index < product.total ? index : product.total;

    params.set('index', indexParams.toString());
    params.set('limit', limit.toString());

    router.gotoURL(`/products?${params.toString()}`);
  };

  const handleSort = (id: unknown) => {
    sortSelect.onSelect(id);

    params.set('sort', id as string);
    router.gotoURL(`/products?${params.toString()}`);
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <RenderIf isRender={!category.isLoading}>
            <CategoryBox categoryList={category.list} />
          </RenderIf>
          <RenderIf isRender={category.isLoading}>
            <CategorySkeleton />
          </RenderIf>
        </div>
        <div className="col-span-9 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div>
              <p>{product.total} Sản phẩm được tìm thấy</p>
            </div>
            <div>
              <Select
                width={200}
                label="Sắp xếp sản phẩm"
                box={{ width: '200px' }}
                shadow="sm"
                optionListProps={{
                  optionList: sortSelect.optionList,
                  modeSelected: 'background',
                  shadow: 'none',
                }}
                isOpen={sortSelect.isOpen}
                onClose={sortSelect.onClose}
                onSelect={handleSort}
                onToggle={sortSelect.onToggle}
                value={sortSelect.value as string}
              />
            </div>
          </div>
          <RenderIf isRender={product.isLoading}>
            <ProductListSkeleton />
          </RenderIf>
          <RenderIf isRender={!product.isLoading}>
            <div>
              <div className="w-full grid grid-cols-12 gap-2">
                {product.list.map(({ id, name, slug, isSaleOff, salePrice, price, salePercent, totalSold }) => {
                  return (
                    <Product
                      key={id}
                      className="col-span-3 bg-white p-2 rounded shadow-sm"
                      name={name}
                      slug={slug}
                      isSaleOff={isSaleOff}
                      salePrice={salePrice}
                      price={price}
                      salePercent={salePercent}
                      totalSold={totalSold}
                    />
                  );
                })}
              </div>
            </div>
          </RenderIf>

          <div className="flex justify-center">
            <div className="bg-white shadow-sm rounded overflow-hidden">
              <Paging
                rounded="none"
                onValue={handlePaging}
                index={index}
                limit={limit}
                total={product.total}
                width={40}
                height={40}
                shadow="none"
                selectTheme="black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

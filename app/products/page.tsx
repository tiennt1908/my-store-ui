'use client';

import Product from '@/components/Product';
import Select from '@/components/Select';
import { useSelect } from '@/customHooks/useSelect';
import { actionAsyncGetCategoryList } from '@/redux/slices/category.slice';
import { actionAsyncGetProductList } from '@/redux/slices/product.slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryBox from './CategoryBox';
import Paging from '@/components/Paging';

type Props = {};

export default function Products({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
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
    const sortCol = searchParams.get('sortCol') || 'totalSold';
    const sortType = searchParams.get('sortType');
    const isSaleOff = searchParams.get('isSaleOff');
    const searchValue = searchParams.get('searchValue');
    const categoryId = searchParams.get('categoryId');
    const collectionId = searchParams.get('collectionId');

    const input: any = {
      sortCol,
      sortType: sortType === 'ASC' ? sortType : 'DESC',
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

  useEffect(() => {
    switch (sortSelect.value) {
      case 'newest':
        params.set('sortCol', 'createAt');
        params.set('sortType', 'DESC');
        break;
      case 'sale_off_most':
        params.set('sortCol', 'salePercent');
        params.set('sortType', 'DESC');
        break;
      case 'price_desc':
        params.set('sortCol', 'price');
        params.set('sortType', 'DESC');
        break;
      case 'price_asc':
        params.set('sortCol', 'price');
        params.set('sortType', 'ASC');
        break;
      default:
        params.set('sortCol', 'totalSold');
        params.set('sortType', 'DESC');
        break;
    }
    router.push(`/products?${params.toString()}`);
  }, [sortSelect.value]);

  const handlePaging = (p: number) => {
    const index = (p - 1) * limit;
    const indexParams = index < product.total ? index : product.total;

    params.set('index', indexParams.toString());
    params.set('limit', limit.toString());

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <CategoryBox categoryList={category.list} />
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
                onSelect={sortSelect.onSelect}
                onToggle={sortSelect.onToggle}
                value={sortSelect.value as string}
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-2">
            {product.list.map(({ id, name, slug, isSaleOff, salePrice, price, salePercent }) => {
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
                />
              );
            })}
          </div>
          <div className="flex justify-center">
            <div className="bg-white shadow-sm rounded overflow-hidden">
              <Paging
                rounded="none"
                onValue={handlePaging}
                index={index}
                bord
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

import { IProduct } from '@/app/api/product/product.output';
import React from 'react';
import Product from './Product';
import WrappedLink from '../Wrapped/WrappedLink';
import Button from '../Button';
import RenderIf from '../RenderIf';

type Props = {
  title: string;
  titleColor?: 'red' | 'slate';
  productList: IProduct[];
  hrefViewMore?: string;
};

export default function ProductListGrid({ title, titleColor = 'slate', productList, hrefViewMore }: Props) {
  const textColor: any = {
    red: 'text-red-500',
    slate: 'text-slate-800',
  };

  return (
    <div className="bg-white rounded shadow-sm">
      <div className="flex justify-between p-4 border-b">
        <p className={`text-lg font-medium ${textColor[titleColor]}`}>{title}</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-10 gap-4">
          {productList.map(({ id, name, slug, isSaleOff, salePrice, price, salePercent, totalSold }) => {
            return (
              <Product
                id={id}
                className="col-span-2"
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
      <RenderIf isRender={hrefViewMore != undefined}>
        <div className="flex justify-center mb-4">
          <WrappedLink href={hrefViewMore}>
            <Button theme="black" shadow="none">
              Xem thêm sản phẩm
            </Button>
          </WrappedLink>
        </div>
      </RenderIf>
    </div>
  );
}

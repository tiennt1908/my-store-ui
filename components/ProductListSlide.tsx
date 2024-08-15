import React from 'react';
import WrappedLink from './Wrapped/WrappedLink';
import { IProduct } from '@/app/api/product/product.output';
import Slide from './Slide';
import Product from './Product';
import RenderIf from './RenderIf';

type Props = {
  title: string;
  titleColor?: 'red' | 'slate';
  productList: IProduct[];
  hrefViewMore?: string;
};

export default function ProductListSlide({ title, titleColor = 'slate', productList, hrefViewMore }: Props) {
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
        <Slide
          gap="1rem"
          elementInSlide={5}
          elementPerSlide={2}
          isDot={false}
          slideButtonSpacingX={0}
          slideButtonProps={{
            rounded: 'full',
            height: 35,
            width: 35,
            darkTheme: 'none',
          }}
        >
          {productList.map(({ name, slug, isSaleOff, salePrice, price, salePercent, totalSold }) => {
            return (
              <Product
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
          <RenderIf isRender={hrefViewMore != undefined}>
            <div className="flex items-center justify-center">
              <WrappedLink className="hover:underline font-medium" href={hrefViewMore}>
                Xem thêm sản phẩm
              </WrappedLink>
            </div>
          </RenderIf>
        </Slide>
      </div>
    </div>
  );
}

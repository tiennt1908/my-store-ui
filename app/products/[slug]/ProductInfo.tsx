'use client';
import { PRODUCT_API } from '@/app/api/product';
import { GetProductPropertyListOutput, IProduct, IPropertyValueId } from '@/app/api/product/product.output';
import Button from '@/components/Button';
import { IFormRequire, useForm } from '@/customHooks/useForm';
import { actAddToCart } from '@/redux/slices/cart.slice';
import { actPushMessages } from '@/redux/slices/notify.slice';
import { AppDispatch, RootState } from '@/redux/store';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AmountBox from './AmountBox';
import AttributeBox from './AttributeBox';
import DescBox from './DescBox';

type Props = {
  product: IProduct;
};
type OrderForm = {
  propertyGroupId: number;
  amount: number;
};

export default function ProductInfo({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [productProperty, setProductProperty] = useState<GetProductPropertyListOutput>();
  const [propertySelected, setPropertySelected] = useState<IPropertyValueId[]>([]);
  const cart = useSelector((state: RootState) => state.cart);

  const initForm: OrderForm = {
    propertyGroupId: 0,
    amount: 1,
  };
  const initFormRequire: IFormRequire = {
    propertyGroupId: {
      min: {
        value: 1,
        message: 'Vui lòng chọn thuộc tính sản phẩm',
      },
    },
    amount: {
      min: {
        value: 1,
        message: 'Vui lòng nhập số lượng',
      },
    },
  };
  const { handleSetForm, onSubmit, form, errors } = useForm<OrderForm>(initForm, initFormRequire);

  const handleSetAmount = (value: number) => {
    handleSetForm('amount', value);
  };
  const handleSetPropertyGroupId = (propId: number, valueId: number) => {
    const index = propertySelected.findIndex((e) => e.id === propId);
    let cloneProp: IPropertyValueId[] = JSON.parse(JSON.stringify(propertySelected));

    if (index === -1) {
      cloneProp = [...cloneProp, { id: propId, valueId: valueId }];
    } else {
      cloneProp[index] = { id: propId, valueId: valueId };
    }

    if (productProperty?.optionGroup) {
      const options = productProperty?.optionGroup.map((e) => e.options);
      cloneProp.sort((a, b) => a.id - b.id);
      const groupIndex = options.findIndex((op) =>
        _.isEqual(
          cloneProp,
          op.sort((a, b) => a.id - b.id)
        )
      );
      const propductPropertyGroup = productProperty?.optionGroup[groupIndex];

      if (propductPropertyGroup) {
        handleSetForm('propertyGroupId', propductPropertyGroup.id);
      } else {
        handleSetForm('propertyGroupId', 0);
      }
    }

    setPropertySelected(cloneProp);
  };

  useEffect(() => {
    PRODUCT_API.getProductPropertyList({ productId: product.id }).then((res) => {
      if (res.data.properties.length === 0) {
        handleSetForm('propertyGroupId', res.data.optionGroup[0]?.id || 0);
      }
      setProductProperty(res.data);
    });
  }, []);

  const handleAddToCart = (data: OrderForm) => {
    const item = cart.mapItems[data.propertyGroupId];
    const isEnough = data.amount * 1 + (item?.amount || 0) * 1 <= (propductPropertyGroup?.amount || 0);

    if (isEnough) {
      dispatch(
        actAddToCart({
          productPropertyGroupId: data.propertyGroupId,
          amount: data.amount,
        })
      );
      dispatch(
        actPushMessages([
          {
            message: 'Đã thêm sản phẩm vào giỏ hàng',
            status: true,
          },
        ])
      );
    } else {
      dispatch(
        actPushMessages([
          {
            message: 'Kho không đủ sản phẩm',
            status: false,
          },
        ])
      );
    }
  };

  const priceRender = product.isSaleOff ? product.salePrice : product.price;
  const salePecent = Math.round(((product.price - product.salePrice) * 100) / product.price || 0);

  const propductPropertyGroup = productProperty?.optionGroup?.find((e) => e.id === form.propertyGroupId);

  return (
    <div className="flex flex-col gap-4 h-full px-4">
      <p className="text-xl">{product.name}</p>
      <div className="flex gap-2 items-center text-xl">
        <p className="font-medium">{priceRender}đ</p>
        {product.isSaleOff && (
          <div className="flex gap-2">
            <p className="text-slate-400 line-through">{product.price}đ</p>
            <p className="text-red-500">-{salePecent}%</p>
          </div>
        )}
      </div>
      <DescBox desc={product.desc} />
      <AttributeBox productProperty={productProperty} handleSetPropertyGroupId={handleSetPropertyGroupId} />
      {errors['propertyGroupId']?.message && <p className="text-sm text-red-500">{errors['propertyGroupId']?.message}</p>}
      <AmountBox handleSetAmount={handleSetAmount} availableAmount={propductPropertyGroup ? propductPropertyGroup?.amount || 0 : -1} />
      <div className="flex gap-2">
        <Button className="w-full" shadow="none" theme="black">
          Mua ngay
        </Button>
        <Button
          className="w-full"
          shadow="none"
          borderWidth="1"
          borderColor="black"
          onClick={() => {
            onSubmit(handleAddToCart);
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
}

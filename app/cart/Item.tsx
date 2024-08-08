import AmountInput from '@/components/AmountInput';
import Button from '@/components/Button';
import { actRemoveProduct, actUpdateProductAmount } from '@/redux/slices/cart.slice';
import { AppDispatch, RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { GET_IMAGE_URL_HELPER } from '../lib/helper/get-image-url.helper';
import Properties from './Properties';
import { IProductCart } from '../api/product/product.output';

export default function Item({ id, slug, imageIndex, name, properties, price, salePrice, isSaleOff }: IProductCart) {
  const dispatch = useDispatch<AppDispatch>();
  const mapItems = useSelector((state: RootState) => state.cart.mapItems);

  const priceRender = isSaleOff ? salePrice : price;

  const handleUpdateProductAmount = (value: string) => {
    if (value) {
      dispatch(actUpdateProductAmount({ productPropertyGroupId: id, amount: parseInt(value) }));
    }
  };
  const handleRemoveProduct = () => {
    dispatch(actRemoveProduct(id));
  };

  return (
    <div className="flex justify-between p-4 gap-2 border-b" style={{ height: 180 }}>
      <Image width={106.8} height={145.8} alt="s" src={GET_IMAGE_URL_HELPER('products', slug + '-' + imageIndex)} />
      <div className="flex flex-col gap-2 w-full">
        <Link href={`/products/${slug}`} className="font-medium hover:underline">
          {name}
        </Link>
        <Properties properties={properties || []} />
        <p>
          Giá: {priceRender}đ <span className="text-slate-400 line-through">{price}đ</span>
        </p>
        <div className="flex items-center gap-1">
          <span>Số lượng:</span>
          <div style={{ width: 120 }}>
            <AmountInput
              initValue={(mapItems[id]?.amount || 0).toString()}
              className="font-medium"
              size="md"
              onValue={handleUpdateProductAmount}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <Button shadow="sm" theme="slate" onClick={handleRemoveProduct}>
          Xóa
        </Button>
      </div>
    </div>
  );
}

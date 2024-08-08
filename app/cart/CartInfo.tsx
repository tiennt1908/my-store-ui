import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import { IFormRequire, useForm } from '@/customHooks/useForm';
import { actPushMessages } from '@/redux/slices/notify.slice';
import { actionAsyncCreateOrder } from '@/redux/slices/order.slice';
import { AppDispatch, RootState } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderItemInput } from '../api/order/order.input';

type OrderInfoFormType = {
  address: string;
  phoneNumber: string;
};
type Props = {
  orderItems: OrderItemInput[];
};
export default function CartInfo({ orderItems }: Props) {
  const initForm: OrderInfoFormType = {
    address: '',
    phoneNumber: '',
  };
  const initRequire: IFormRequire = {
    address: {
      minLength: {
        value: 12,
        message: 'Nhập chi tiết địa chỉ của bạn tối thiểu 12 ký tự',
      },
      maxLength: {
        value: 255,
        message: 'Yêu cầu địa chỉ không quá 255 ký tự',
      },
    },
    phoneNumber: {
      pattern: {
        value: /^0[0-9]{9}$/,
        message: 'Số điện thoại không hợp lệ',
      },
    },
  };
  const { handleSetForm, errors, form, onSubmit } = useForm<OrderInfoFormType>(initForm, initRequire);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.info);

  const handleCreateOrder = () => {
    if (orderItems.length < 1) {
      return dispatch(actPushMessages([{ message: 'Không có sản phẩm trong giỏ hàng', status: false }]));
    }

    if (!user?.id) {
      return dispatch(actPushMessages([{ message: 'Vui lòng đăng nhập để tạo đơn hàng', status: false }]));
    }

    onSubmit((input: OrderInfoFormType) => {
      dispatch(
        actionAsyncCreateOrder({
          ...input,
          userId: user.id,
          orderItems,
        })
      );
    });
  };

  useEffect(() => {
    if (user.id) {
      handleSetForm('phoneNumber', user.phoneNumber);
    }
  }, [user.id]);

  return (
    <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4">
      <p className="text-center font-medium">Thông tin đặt hàng</p>
      <FormInput
        title="SĐT người nhận:"
        onValue={(value: string) => {
          handleSetForm('phoneNumber', value);
        }}
        value={form.phoneNumber}
        errorMessage={errors['phoneNumber']?.message}
      />
      <FormInput
        title="Địa chỉ nhận hàng:"
        onValue={(value: string) => {
          handleSetForm('address', value);
        }}
        value={form.address}
        errorMessage={errors['address']?.message}
      />
      <Button theme="black" shadow="none" width="100%" onClick={handleCreateOrder}>
        Tạo đơn hàng
      </Button>
    </div>
  );
}

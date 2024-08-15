'use client';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import WrappedLink from '@/components/Wrapped/WrappedLink';
import { IFormRequire, useForm } from '@/customHooks/useForm';
import { usePushURL } from '@/customHooks/usePushURL';
import { actionAsyncRegister } from '@/redux/slices/auth.slice';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

type RegisterFormType = {
  fullName: string;
  phoneNumber: string;
  password: string;
  rePassword: string;
};

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = usePushURL();

  const initForm: RegisterFormType = {
    fullName: '',
    phoneNumber: '',
    password: '',
    rePassword: '',
  };

  const initRequire: IFormRequire = {
    fullName: {
      isRequired: {
        value: true,
        message: 'Yêu cầu không để trống',
      },
      minLength: {
        value: 3,
        message: 'Yêu cầu ít nhất 3 ký tự',
      },
      maxLength: {
        value: 32,
        message: 'Yêu cầu tối đa 32 ký tự',
      },
      pattern: {
        value:
          /^(\s?[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+)+$/,
        message: 'Họ tên chứa ký tự không hợp lệ',
      },
    },
    phoneNumber: {
      isRequired: {
        value: true,
        message: 'Yêu cầu không để trống',
      },
      pattern: {
        value: /^0[0-9]{9}$/,
        message: 'Số điện thoại không hợp lệ',
      },
    },
    password: {
      isRequired: {
        value: true,
        message: 'Yêu cầu không để trống',
      },
      minLength: {
        value: 6,
        message: 'Mật khẩu phải có ít nhất 6 ký tự',
      },
      maxLength: {
        value: 32,
        message: 'Mật khẩu tối đa 32 ký tự',
      },
    },
    rePassword: {
      validate: {
        value: (value: string, form: RegisterFormType) => {
          return isMatchPassword(value, form);
        },
        message: 'Mật khẩu không khớp',
      },
    },
  };

  const { form, errors, handleSetForm, onSubmit } = useForm<RegisterFormType>(initForm, initRequire);

  const isMatchPassword = (value: string, form: RegisterFormType) => {
    return value === form.password;
  };
  const register = ({ fullName, phoneNumber, password }: RegisterFormType) => {
    dispatch(
      actionAsyncRegister({
        fullName,
        phoneNumber,
        password,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        router.gotoURL('/login');
      }
    });
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white p-4 rounded shadow-sm" style={{ width: 450 }}>
        <p className="text-center">Đăng Ký</p>
        <div className="mt-2 flex flex-col gap-2">
          <FormInput
            title="Họ Tên Đầy Đủ*"
            placeholder="Vd: Nguyễn Văn A"
            errorMessage={errors['fullName']?.message}
            onValue={(value: string) => {
              handleSetForm('fullName', value);
            }}
          />
          <FormInput
            title="Số điện thoại*"
            placeholder="Vd: 0861234567"
            errorMessage={errors['phoneNumber']?.message}
            onValue={(value: string) => {
              handleSetForm('phoneNumber', value);
            }}
          />
          <FormInput
            type="password"
            title="Mật khẩu*"
            placeholder="********"
            errorMessage={errors['password']?.message}
            onValue={(value: string) => {
              handleSetForm('password', value);
            }}
          />
          <FormInput
            type="password"
            title="Nhập lại Mật khẩu*"
            placeholder="********"
            errorMessage={errors['rePassword']?.message}
            onValue={(value: string) => {
              handleSetForm('rePassword', value);
            }}
          />
          <div>
            <Button
              theme="black"
              width="100%"
              onClick={() => {
                onSubmit(register);
              }}
            >
              Đăng Ký
            </Button>
          </div>
          <div className="text-sm">
            Bạn đã có tài khoản?
            <WrappedLink href={'/login'} className="underline ml-1">
              Đăng nhập
            </WrappedLink>
          </div>
        </div>
      </div>
    </div>
  );
}

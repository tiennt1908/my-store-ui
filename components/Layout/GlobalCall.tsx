'use client';

import { actGetProductInCart } from '@/redux/slices/cart.slice';
import { actionAsyncGetUserInfo } from '@/redux/slices/user.slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {};

export default function GlobalCall({}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(actionAsyncGetUserInfo());
    dispatch(actGetProductInCart());
  }, []);

  return <></>;
}

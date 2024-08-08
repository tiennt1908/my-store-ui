'use client';

import OptionList from '@/components/OptionList';
import React from 'react';
import { IOption } from '../lib/interface/component.interface';
import { useRouter, useSearchParams } from 'next/navigation';
import OrderTable from './OrderTable';
import Empty from '@/components/Empty';

type Props = {};

export default function UserPage({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const currentTab = searchParams.get('tab') || 'account';

  const menuList: IOption[] = [
    {
      id: 'account',
      content: 'Tài Khoản',
      action: () => {
        return true;
      },
    },
    {
      id: 'address',
      content: 'Địa Chỉ',
      action: () => {
        return true;
      },
    },
    {
      id: 'payment',
      content: 'Phương Thức Thanh Toán',
      action: () => {
        return true;
      },
    },
    {
      id: 'order',
      content: 'Đơn Hàng',
      action: () => {
        return true;
      },
    },
  ];

  const handleSelect = (id: string) => {
    params.set('tab', id);
    router.push(`user?${params.toString()}`);
  };

  const mapTab: any = {
    order: <OrderTable />,
  };

  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      <div className="col-span-3">
        <div className="py-3 bg-white rounded shadow-sm">
          <OptionList
            modeSelected="background"
            value={currentTab}
            onSelect={handleSelect}
            optionList={menuList}
            shadow="none"
            rounded="none"
          />
        </div>
      </div>
      <div className="col-span-9">
        <div>{mapTab[currentTab] || <Empty style={{ height: 450 }} />}</div>
      </div>
    </div>
  );
}

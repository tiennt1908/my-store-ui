'use client';

import OptionList from '@/components/OptionList';
import { usePushURL } from '@/customHooks/usePushURL';
import { BeakerIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { IOption } from '../lib/interface/component.interface';
import OrderTable from './OrderTable';

type Props = {};

export default function UserPage({}: Props) {
  const router = usePushURL();
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
    router.gotoURL(`user?${params.toString()}`);
  };

  const mapTab: any = {
    order: <OrderTable />,
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <div className="py-3 bg-white rounded shadow-sm">
          <OptionList
            modeSelected="background"
            selectValue={currentTab}
            onSelect={handleSelect}
            optionList={menuList}
            shadow="none"
            rounded="none"
          />
        </div>
      </div>
      <div className="col-span-9">
        <div>
          {mapTab[currentTab] || (
            <div className="bg-white rounded shadow-sm flex justify-center items-center font-medium" style={{ height: 450 }}>
              <div className="flex flex-col justify-center items-center gap-2">
                <BeakerIcon className="w-14 text-slate-300" />
                <p>Đang xây dựng...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

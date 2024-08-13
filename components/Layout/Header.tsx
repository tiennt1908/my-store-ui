'use client';
import Image from 'next/image';
import React from 'react';
import Input from '../Input';
import { ChevronDownIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import SearchBar from './SearchBar';
import Select from '../Select';
import { useSelect } from '@/customHooks/useSelect';
import Button from '../Button';
import { actLogout } from '@/redux/slices/user.slice';

type Props = {};

export default function Header({}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.info);
  const profileSelect = useSelect({
    initOptionList: [
      {
        id: 1,
        content: 'Tài Khoản',
        href: '/user?tab=account',
      },
      {
        id: 2,
        content: 'Đơn Hàng',
        href: '/user?tab=order',
      },
      {
        id: 3,
        content: 'Đăng Xuất',
        action: () => {
          dispatch(actLogout());
          return true;
        },
      },
    ],
    initVal: null,
  });
  return (
    <header className="flex justify-between bg-white items-center px-6 border-b sticky top-0 z-50" style={{ height: 72 }}>
      <div>
        <Link href="/">
          <Image src="/next.svg" alt="Next.js Logo" width={90} height={18} priority />
        </Link>
      </div>
      <SearchBar />
      <div className="flex gap-3">
        {user.id === 0 && (
          <div className="flex gap-1 items-center text-sm">
            <Link href="/login" className="hover:underline">
              Đăng Nhập
            </Link>
            <span>/</span>
            <Link href="/register" className="hover:underline">
              Đăng Ký
            </Link>
          </div>
        )}
        {user.id > 0 && (
          <Select
            isHiddenArrow={true}
            label={user.fullName}
            defaultIcon={UserIcon}
            box={{ width: 175, className: 'shadow-sm' }}
            isIconRounded={true}
            isOpen={profileSelect.isOpen}
            onClose={profileSelect.onClose}
            onSelect={profileSelect.onSelect}
            onToggle={profileSelect.onToggle}
            value={'_'}
            shadow="none"
            optionListProps={{
              optionList: profileSelect.optionList,
              modeSelected: 'background',
              shadow: 'sm',
            }}
          />
        )}

        <Link href="/cart" className="flex gap-1 text-sm hover:cursor-pointer">
          <Button shadow="none">
            <ShoppingBagIcon className="w-5" />
            <span>Giỏ hàng</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}

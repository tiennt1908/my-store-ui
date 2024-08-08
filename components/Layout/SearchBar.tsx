import React, { useEffect, useState } from 'react';
import Input from '../Input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {};

export default function SearchBar({}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState<string>('');

  const handleSetSearchValue = (val: string) => {
    setValue(val);
  };
  const handleSearch = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const params = new URLSearchParams(searchParams.toString());
      params.set('searchValue', value);
      router.push(`/products?${params.toString()}`);
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => handleSearch(event);
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  });

  return (
    <div style={{ width: '50%', maxWidth: 600, minWidth: 400 }}>
      <Input
        theme="slate"
        placeholder="Tìm kiếm sản phẩm..."
        right={{ icon: MagnifyingGlassIcon }}
        borderWidth="0"
        onValue={handleSetSearchValue}
      />
    </div>
  );
}

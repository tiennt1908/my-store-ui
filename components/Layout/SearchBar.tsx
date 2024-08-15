import { usePushURL } from '@/customHooks/usePushURL';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Input from '../Input';

type Props = {};

export default function SearchBar({}: Props) {
  const searchParams = useSearchParams();
  const router = usePushURL();
  const [value, setValue] = useState<string>('');

  const handleSetSearchValue = (val: string) => {
    setValue(val);
  };
  const handleSearch = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const params = new URLSearchParams(searchParams.toString());
      params.set('searchValue', value);
      router.gotoURL(`/products?${params.toString()}`);
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

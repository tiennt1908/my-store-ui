import React, { useEffect, useState } from 'react';
import Input from './Input';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

type Props = {
  initValue: string;
  onValue: Function;
  [key: string]: unknown;
};

export default function AmountInput({ onValue, initValue, ...restProps }: Props) {
  const [value, setValue] = useState(initValue);

  const increaseAmount = () => {
    const parseValue = parseInt(value) || 0;
    setValue((parseValue + 1).toString());
  };
  const decreaseAmount = () => {
    const parseValue = parseInt(value) || 0;
    if (parseValue > 1) {
      setValue((parseValue - 1).toString());
    } else {
      setValue('1');
    }
  };
  const handleChangeAmount = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    onValue(value);
  }, [value]);

  return (
    <Input
      type="number"
      left={{
        icon: MinusIcon,
        className: 'cursor-pointer',
        onClick: decreaseAmount,
      }}
      right={{
        icon: PlusIcon,
        className: 'cursor-pointer',
        onClick: increaseAmount,
      }}
      value={value}
      onValue={(val) => {
        handleChangeAmount(val);
      }}
      style={{ textAlign: 'center' }}
      {...restProps}
    />
  );
}

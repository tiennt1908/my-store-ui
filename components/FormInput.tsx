import React from 'react';
import Input from './Input';

type Props = {
  title: string;
  errorMessage?: string;
  onValue: (...agrs: any) => void;
  [key: string]: unknown;
};

export default function FormInput({ onValue, title, errorMessage, ...restProps }: Props) {
  return (
    <div>
      <p className="text-sm">{title}</p>
      <Input className="mt-1" onValue={onValue} {...restProps} />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

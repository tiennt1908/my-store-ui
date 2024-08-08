import React from 'react';

type Props = {
  [key: string]: unknown;
};

export default function Empty({ ...restProps }: Props) {
  return (
    <div className="bg-white rounded shadow-sm flex justify-center items-center font-medium" {...restProps}>
      Không tìm thấy thông tin
    </div>
  );
}

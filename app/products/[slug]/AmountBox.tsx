"use client";

import Input from "@/components/Input";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

type Props = {
  handleSetAmount: Function;
  availableAmount: number;
};

export default function AmountBox({ availableAmount, handleSetAmount }: Props) {
  const [value, setValue] = useState("1");
  const increaseAmount = () => {
    const parseValue = parseInt(value) || 0;
    setValue((parseValue + 1).toString());
  };
  const decreaseAmount = () => {
    const parseValue = parseInt(value) || 0;
    if (parseValue > 1) {
      setValue((parseValue - 1).toString());
    } else {
      setValue("1");
    }
  };
  const handleChangeAmount = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    handleSetAmount(value);
  }, [value]);

  return (
    <div>
      <p className="font-medium">Số lượng</p>
      <div className="flex items-center gap-4">
        <Input
          className="font-medium mt-1"
          type="number"
          left={{
            icon: MinusIcon,
            className: "cursor-pointer",
            onClick: decreaseAmount,
          }}
          right={{
            icon: PlusIcon,
            className: "cursor-pointer",
            onClick: increaseAmount,
          }}
          value={value}
          onValue={(val) => {
            handleChangeAmount(val);
          }}
          style={{ textAlign: "center" }}
        />
        {availableAmount > 0 && (
          <p className="text-sm">{availableAmount} Sản phẩm có sẵn</p>
        )}
        {availableAmount === 0 && (
          <p className="text-red-500 text-sm">Hết hàng</p>
        )}
      </div>
    </div>
  );
}

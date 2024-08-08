import React from "react";

type Props = {
  desc: string;
};

export default function DescBox({ desc }: Props) {
  return (
    <div>
      <p className="font-medium">Mô tả ngắn</p>
      <div>{desc}</div>
    </div>
  );
}

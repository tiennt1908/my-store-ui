import { SizeOption } from "@/app/lib/type/decoration.type";
import Image from "next/image";
import React from "react";

type Props = {
  size?: SizeOption;
  icon?: Function | string | undefined;
  alt?: string;
  isRounded?: boolean;
  [key: string]: unknown;
};

export default function IconCustom({
  size = "lg",
  icon,
  alt,
  isRounded,
  style,
  ...restProps
}: Props) {
  const iconType = typeof icon;
  let iconTag = null;

  if (iconType === "string" && icon) {
    const sizeMap = {
      xs: 16,
      sm: 18,
      md: 20,
      lg: 24,
      xl: 28,
    };
    iconTag = (
      <Image
        alt={alt || "Icon Image"}
        {...restProps}
        width={sizeMap[size]}
        height={sizeMap[size]}
        className={isRounded ? "rounded-full bg-white shadow" : ""}
        style={{
          minWidth: sizeMap[size],
          minHeight: sizeMap[size],
          ...(isRounded ? { padding: "0.1rem" } : {}),
          ...(style ? style : {}),
        }}
        src={icon as string}
      />
    );
  }

  if (icon && iconType !== "string") {
    const sizeMap = {
      xs: 14,
      sm: 14,
      md: 16,
      lg: 16,
      xl: 20,
    };
    const Icon = icon as any;
    iconTag = (
      <Icon
        width={sizeMap[size]}
        height={sizeMap[size]}
        style={{
          minWidth: sizeMap[size],
          minHeight: sizeMap[size],
          strokeWidth: 2,
          ...(style ? style : {}),
        }}
        {...restProps}
      />
    );
  }

  return iconTag ? iconTag : <></>;
}

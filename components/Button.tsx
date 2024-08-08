import {
  AlignOption,
  BorderColorOption,
  BorderWidthOption,
  DarkThemeOption,
  FontWeightOption,
  RadiusOption,
  ShadowOption,
  SizeOption,
  ThemeOption,
} from "@/app/lib/type/decoration.type";
import React, { ReactNode } from "react";
import IconCustom from "./IconCustom";
import SpinIcon from "./Icons/SpinIcon";

export type ButtonProps = {
  darkTheme?: DarkThemeOption;
  theme?: ThemeOption;
  size?: SizeOption;
  align?: AlignOption;
  rounded?: RadiusOption;
  fontWeight?: FontWeightOption;
  shadow?: ShadowOption;
  borderColor?: BorderColorOption;
  borderWidth?: BorderWidthOption;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  left?: {
    icon?: Function | string;
    isRounded?: boolean;
    [key: string]: unknown;
  };
  right?: {
    icon?: Function | string;
    isRounded?: boolean;
    [key: string]: unknown;
  };
  isLoading?: boolean;
  [key: string]: unknown;
};
export default function Button({
  darkTheme = "slate",
  theme = "white",
  size = "lg",
  rounded = "default",
  align = "center",
  fontWeight = "medium",
  shadow = "default",
  borderColor = "none",
  borderWidth = "none",
  style,
  width,
  height,
  left,
  right,
  isLoading = false,
  className,
  children,
  ...restProps
}: ButtonProps) {
  const themeMap = {
    none: "",
    primary: `bg-indigo-600 hover:bg-indigo-500 text-white`,
    white: `bg-white hover:bg-gray-100 text-gray-700`,
    slate: `bg-slate-100 hover:bg-slate-50 text-gray-700`,
    black: `bg-slate-800 hover:bg-slate-700 text-white`,
  };
  const darkThemeMap = {
    none: "",
    slate: "dark:bg-slate-400/10 dark:text-white dark:disabled:text-white/50",
    transparent: "dark:bg-transparent",
  };
  const justifyContentMap = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    between: "justify-between",
  };
  const borderRadiusMap = {
    none: "rounded-none",
    default: "rounded",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };
  const fontWeightMap = {
    thin: "font-thin",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };
  const sizeMap = {
    xs: "h-6 text-xs py-1 px-2",
    sm: "h-7 text-sm py-1 px-2",
    md: "h-8 text-sm py-1.5 px-2.5",
    lg: "h-9 text-sm py-2 px-3",
    xl: "h-10 text-md py-2.5 px-3.5",
  };
  const shadowMap = {
    none: "shadow-none",
    default: "shadow",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };
  const borderWidthMap = {
    none: "",
    "0": "border-0",
    "1": "border",
    "2": "border-2",
    "4": "border-4",
    "8": "border-8",
  };
  const borderColorMap = {
    none: "",
    transparent: "border-transparent",
    slate: "border-slate-100 dark:border-slate-400/10",
    black: "border-slate-800",
  };
  const gapMap = {
    xs: "gap-2",
    sm: "gap-2",
    md: "gap-2.5",
    lg: "gap-3",
    xl: "gap-3.5",
  };

  const buttonClass = `
        flex items-center  
        disabled:cursor-no-drop 
        ${gapMap[size]} 
        ${sizeMap[size]} 
        ${justifyContentMap[align]} 
        ${borderRadiusMap[rounded]} 
        ${fontWeightMap[fontWeight]} 
        ${shadowMap[shadow]} 
        ${borderWidthMap[borderWidth]} 
        ${borderColorMap[borderColor]} 
        ${themeMap[theme]} 
        ${darkThemeMap[darkTheme]}
        ${className ? className : ""}
    `;

  return (
    <button
      className={buttonClass}
      {...restProps}
      style={{ width, height, ...(style ? style : {}) }}
    >
      <div className={`flex items-center ${gapMap[size]}`}>
        {left?.icon && !isLoading && (
          <>
            {!isLoading && (
              <IconCustom size={size} icon={left?.icon} {...left} />
            )}
          </>
        )}
        {isLoading && <SpinIcon className="w-4" />}
        {children}
      </div>
      <IconCustom size={size} icon={right?.icon} {...right} />
    </button>
  );
}

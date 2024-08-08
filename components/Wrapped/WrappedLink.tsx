import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  [key: string]: unknown;
};

export default function WrappedLink({ href, children, ...restProps }: Props) {
  if (!href) {
    return children;
  }
  return (
    <Link href={href} {...restProps}>
      {children}
    </Link>
  );
}

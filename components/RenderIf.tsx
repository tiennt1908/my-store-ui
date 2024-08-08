import React, { ReactNode } from 'react';

type Props = {
  isRender: boolean;
  children: ReactNode;
};

export default function RenderIf({ isRender, children }: Props) {
  if (!isRender) {
    return <></>;
  }
  return children;
}

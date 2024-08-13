'use client';

import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import Button, { ButtonProps } from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';
import RenderIf from './RenderIf';

type Props = {
  slideButtonSpacingX?: number;
  slideButtonProps?: ButtonProps;

  pxPerSlide: number;

  isTransition?: boolean;
  transitionDuration?: number;

  className?: string;
  children: ReactNode;
};

export default function Thumbnail({
  isTransition = true,
  transitionDuration = 500,
  slideButtonSpacingX = 0,
  slideButtonProps,
  pxPerSlide = 0,
  className,
  children,
}: Props) {
  const slideBoxRef = useRef(null);
  const slideContainElementRef = useRef(null);

  const [attribute, setAttribute] = useState({
    width: 0,
    elementWidth: 0,
  });
  const [x, setX] = useState(0);

  useEffect(() => {
    if (slideBoxRef.current && slideContainElementRef.current) {
      const slideBox = slideBoxRef.current as HTMLElement;
      const slideBoxRect = slideBox.getBoundingClientRect();

      const slideContainElement = slideContainElementRef.current as HTMLElement;
      const slideContainElementRect = slideContainElement.getBoundingClientRect();

      setAttribute({
        ...attribute,
        elementWidth: slideContainElementRect.width,
        width: slideBoxRect.width,
      });
    }
  }, [slideBoxRef, slideContainElementRef, children]);

  const handleGotoSlide = (nextX: number) => {
    const { width, elementWidth } = attribute;
    if (elementWidth > width) {
      if (elementWidth - nextX >= width && nextX >= 0) {
        setX(nextX);
      } else if (elementWidth - nextX < width) {
        setX(elementWidth - width);
      } else if (nextX < 0) {
        setX(0);
      }
    }
  };

  const handleBackSlide = () => {
    const nextX = x - pxPerSlide;
    handleGotoSlide(nextX);
  };
  const handleNextSlide = () => {
    const nextX = x + pxPerSlide;
    handleGotoSlide(nextX);
  };

  const slideButtonClass = `absolute ${slideButtonProps?.className}`;

  const styleSlide: CSSProperties = {
    transform: `translateX(${x * -1}px)`,
  };

  if (isTransition) {
    styleSlide.transitionDuration = `${transitionDuration}ms`;
  }

  return (
    <div className="flex relative items-center">
      <RenderIf isRender={attribute.elementWidth > attribute.width}>
        <Button
          onClick={handleBackSlide}
          rounded="none"
          {...slideButtonProps}
          className={slideButtonClass}
          style={{ zIndex: 1, left: slideButtonSpacingX, ...(slideButtonProps?.style || {}) }}
        >
          <ChevronLeftIcon className="w-4" />
        </Button>
      </RenderIf>
      <div className="w-full overflow-hidden" ref={slideBoxRef}>
        <div
          ref={slideContainElementRef}
          className={`flex w-fit ${className} ${isTransition ? 'transition ease-out' : ''}`}
          style={styleSlide}
        >
          {children}
        </div>
      </div>
      <RenderIf isRender={attribute.elementWidth > attribute.width}>
        <Button
          onClick={handleNextSlide}
          rounded="none"
          {...slideButtonProps}
          className={slideButtonClass + ` right-0`}
          style={{ zIndex: 1, right: slideButtonSpacingX, ...(slideButtonProps?.style || {}) }}
        >
          <ChevronRightIcon className="w-4" />
        </Button>
      </RenderIf>
    </div>
  );
}

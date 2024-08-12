'use client';

import React, { CSSProperties, ReactNode, useState } from 'react';
import Button, { ButtonProps } from './Button';
import RenderIf from './RenderIf';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
  isTransition?: boolean;
  isDot?: boolean;

  elementInSlide?: number;
  elementPerSlide?: number;

  gotoSlide?: number;

  slideButtonSpacingX?: number;
  dotBoxSpacingY?: number;

  slideButtonProps?: ButtonProps;
  dotProps?: ButtonProps;

  transitionDuration?: number;

  onSlideChange?: Function;

  className?: string;
  style?: CSSProperties;

  children: ReactNode;
};

export default function Slide({
  isTransition = true,
  isDot = false,
  elementInSlide = 1,
  elementPerSlide = 1,
  slideButtonSpacingX = 0,
  dotBoxSpacingY = 2,
  gotoSlide = 0,
  transitionDuration = 500,

  slideButtonProps,
  dotProps,
  className,

  onSlideChange,

  style,
  children,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(gotoSlide);

  const childArray = React.Children.toArray(children);
  const childCount = childArray.length;

  const slideButtonClass = `absolute ${slideButtonProps?.className}`;
  const dotArray = [];
  const dotCount = Math.ceil(childCount / elementInSlide);
  let i = 0;
  for (i = 0; i < dotCount; i++) {
    dotArray.push(i);
  }

  const handleCloneSlide = (index: number) => {
    const childrenArray = React.Children.toArray(children);
    const clonedChildren = React.isValidElement(childrenArray[index])
      ? React.cloneElement(childrenArray[index] as React.ReactElement<any>, {
          style: {
            width: `${100 / childCount}%`,
            userSelect: 'none',
          },
        })
      : childrenArray[index];

    return clonedChildren;
  };

  const handleGotoSlide = (slideNumber: number) => {
    if (childCount - slideNumber < elementInSlide) {
      handleGotoSlide(childCount - elementInSlide);
    } else if (slideNumber < 0) {
      handleGotoSlide(0);
    } else {
      if (onSlideChange) {
        onSlideChange(slideNumber);
      }
      setCurrentSlide(slideNumber);
    }
  };
  const handleNextSlide = () => {
    const nextSlide = currentSlide + elementPerSlide;
    handleGotoSlide(nextSlide);
  };
  const handleBackSlide = () => {
    const nextSlide = currentSlide - elementPerSlide;
    handleGotoSlide(nextSlide);
  };

  let translateX = (currentSlide * -100) / childCount;

  const styleSlide: CSSProperties = {
    width: `${(childCount / elementInSlide) * 100}%`,
    transform: `translateX(${translateX}%)`,
    ...style,
  };

  if (isTransition) {
    styleSlide.transitionDuration = `${transitionDuration}ms`;
  }

  return (
    <div className="relative flex items-center text-slate-700">
      <Button
        onClick={handleBackSlide}
        rounded="none"
        {...slideButtonProps}
        className={slideButtonClass}
        style={{ zIndex: 1, left: slideButtonSpacingX, ...(slideButtonProps?.style || {}) }}
      >
        <ChevronLeftIcon className="w-4" />
      </Button>
      <div className="w-full overflow-hidden relative">
        <div className={`flex ${className} ${isTransition ? 'transition ease-out' : ''}`} style={styleSlide}>
          {childArray.map((e, k) => {
            return handleCloneSlide(k);
          })}
        </div>
        <RenderIf isRender={isDot && dotArray.length > 1}>
          <div className="absolute bottom-0 flex w-full justify-center" style={{ marginBottom: `${0.25 * dotBoxSpacingY}rem` }}>
            <div className="flex justify-center gap-1 w-fit h-fit">
              {dotArray.map((e, k) => {
                return (
                  <Button
                    key={k}
                    onClick={() => {
                      handleGotoSlide(e);
                    }}
                    rounded="full"
                    width={10}
                    height={10}
                    style={{ padding: 0, opacity: e === Math.ceil(currentSlide / elementInSlide) ? 1 : 0.5 }}
                    {...dotProps}
                  />
                );
              })}
            </div>
          </div>
        </RenderIf>
      </div>
      <Button
        onClick={handleNextSlide}
        rounded="none"
        {...slideButtonProps}
        className={slideButtonClass + ` right-0`}
        style={{ zIndex: 1, right: slideButtonSpacingX, ...(slideButtonProps?.style || {}) }}
      >
        <ChevronRightIcon className="w-4" />
      </Button>
    </div>
  );
}

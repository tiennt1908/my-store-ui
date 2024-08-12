'use client';

import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import Button, { ButtonProps } from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import RenderIf from './RenderIf';

type Props = {
  isTransition?: boolean;
  isDot?: boolean;
  isAuto?: boolean;

  interval?: number;

  gotoSlide?: number;

  transitionDuration?: number;

  slideButtonSpacingX?: number;
  dotBoxSpacingY?: number;

  slideButtonProps?: ButtonProps;
  dotProps?: ButtonProps;

  onSlideChange?: Function;

  className?: string;
  style?: CSSProperties;

  children: ReactNode;
};

export default function InfinateSlide({
  isTransition = true,
  isDot = false,
  isAuto = false,
  interval = 2000,

  slideButtonSpacingX = 0,
  dotBoxSpacingY = 2,

  onSlideChange,

  gotoSlide = 1,
  slideButtonProps,
  dotProps,
  transitionDuration = 500,
  children,
  className,
  style,
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(gotoSlide);
  const [transitionStatus, setTransitionStatus] = useState(isTransition);
  const [isAutoSlide, setIsAutoSlide] = useState<boolean>(isAuto);

  const childArray = React.Children.toArray(children);
  const childCount = childArray.length;

  const dotArray = [];

  let i = 0;
  for (i = 0; i < childCount; i++) {
    dotArray.push(i + 1);
  }

  useEffect(() => {
    let resetSlide: NodeJS.Timeout;
    if (currentSlide > childCount) {
      if (isTransition) {
        resetSlide = setTimeout(() => {
          setTransitionStatus(false);
          setCurrentSlide(1);
        }, transitionDuration);
      } else {
        setCurrentSlide(1);
      }
    }

    if (currentSlide === 0) {
      if (isTransition) {
        resetSlide = setTimeout(() => {
          setTransitionStatus(false);
          setCurrentSlide(childCount);
        }, transitionDuration);
      } else {
        setCurrentSlide(childCount);
      }
    }

    if (isAutoSlide) {
      const autoSlide = setTimeout(() => {
        handleNextSlide();
      }, interval);

      return () => {
        clearTimeout(autoSlide);
      };
    }

    return () => {
      clearTimeout(resetSlide);
    };
  }, [isAutoSlide, currentSlide]);

  useEffect(() => {
    setCurrentSlide(gotoSlide);
  }, [gotoSlide]);

  const handleCloneSlide = (index: number) => {
    const childrenArray = React.Children.toArray(children);
    const clonedChildren = React.isValidElement(childrenArray[index])
      ? React.cloneElement(childrenArray[index] as React.ReactElement<any>, {
          style: {
            width: `${100 / (childCount + 2)}%`,
            userSelect: 'none',
          },
        })
      : childrenArray[index];

    return clonedChildren;
  };

  const handleGotoSlide = (slideNumber: number) => {
    const totalSlide = childCount + 1;
    if (slideNumber <= totalSlide && slideNumber >= 0) {
      if (isTransition) {
        setTransitionStatus(true);
      }
      if (onSlideChange) {
        onSlideChange(slideNumber);
      }
      setCurrentSlide(slideNumber);
    }
  };
  const handleNextSlide = () => {
    const nextSlide = currentSlide + 1;
    handleGotoSlide(nextSlide);
  };
  const handleBackSlide = () => {
    const nextSlide = currentSlide - 1;
    handleGotoSlide(nextSlide);
  };
  const handleControlAuto = (status: boolean) => {
    setIsAutoSlide(status);
  };

  let translateX = currentSlide * -100;

  const styleSlide: CSSProperties = {
    width: `${(childCount + 2) * 100}%`,
    transform: `translateX(${translateX / (childCount + 2)}%)`,
    ...style,
  };

  if (transitionStatus) {
    styleSlide.transitionDuration = `${transitionDuration}ms`;
  }

  const slideButtonClass = `absolute ${slideButtonProps?.className}`;

  return (
    <div
      className="relative flex items-center text-slate-700"
      onMouseEnter={() => {
        handleControlAuto(false);
      }}
      onMouseLeave={() => {
        handleControlAuto(isAuto);
      }}
    >
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
        <div className={`flex ${className} ${transitionStatus ? 'transition ease-out' : ''}`} style={styleSlide}>
          {handleCloneSlide(childCount - 1)}
          {childArray.map((e, k) => {
            return handleCloneSlide(k);
          })}
          {handleCloneSlide(0)}
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
                    style={{ padding: 0, opacity: e === currentSlide ? 1 : 0.5 }}
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

"use client";
import React, { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GET_IMAGE_URL_HELPER } from "@/app/lib/helper/get-image-url.helper";

type Props = {
  dots?: boolean;
  infinite?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  children: ReactNode;
};

export default function SliderCustom({
  dots = false,
  infinite = true,
  autoplay = false,
  autoplaySpeed = 5000,
  speed = 500,
  slidesToShow = 1,
  slidesToScroll = 1,
  children,
}: Props) {
  let settings: any = {
    dots,
    infinite,
    autoplay,
    autoplaySpeed,
    speed,
    slidesToShow,
    slidesToScroll,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

"use client";

import { PRODUCT_API } from "@/app/api/product";
import { IProduct, IProductImage } from "@/app/api/product/product.output";
import SliderCustom from "@/components/Slider";
import { useEffect, useState } from "react";
import Image from "./Image";

export default function ProductImage({ id, slug }: IProduct) {
  const [images, setImages] = useState<IProductImage[]>([]);

  useEffect(() => {
    if (id) {
      PRODUCT_API.getProductImages({
        productId: id,
      }).then((res) => {
        setImages(res.data || []);
      });
    }
  }, []);

  return (
    <div className="h-full">
      <SliderCustom dots={true}>
        {images.map((e) => {
          return <Image key={e.id} url={`${slug}-${e.index}`} />;
        })}
      </SliderCustom>
    </div>
  );
}

import { GET_IMAGE_URL_HELPER } from "@/app/lib/helper/get-image-url.helper";
import React from "react";

type Props = {
  url: string;
};

export default function Image({ url }: Props) {
  return (
    <div>
      <div
        className="w-full bg-contain bg-center bg-no-repeat"
        style={{
          height: 450,
          backgroundImage: `url("${GET_IMAGE_URL_HELPER("products", url)}")`,
        }}
      />
    </div>
  );
}

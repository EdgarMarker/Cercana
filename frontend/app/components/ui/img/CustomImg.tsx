import React from "react";
import Image from "next/image";
import { ImageProps } from "next/image";

interface Props extends Omit<ImageProps, "className"> {
  containerClassName?: string;
}
const CustomImg = ({
  containerClassName = "",
  ...props
}: Props) => {
  return (
    <picture className={`imgContainer ${containerClassName} radius__24`}>
      <Image {...props} className={`img`} />
    </picture>
  );
};

export default CustomImg;

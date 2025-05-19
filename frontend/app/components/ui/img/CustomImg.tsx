import React from "react";
import Image from "next/image";
import { ImageProps } from "next/image";

export type ImageCategory = "xl" | "regular" | "small" | "custom";

interface Props extends Omit<ImageProps, "className"> {
  containerClassName?: string;
  category: ImageCategory;
  quality?: number;
}

const CustomImg = ({
  containerClassName = "",
  category = "custom",
  quality,
  ...props
}: Props) => {
  const categoryConfig: Record<ImageCategory, {
    sizes: string,
    quality: number,
    priority?: boolean
  }> = {
    xl: {
      sizes: "100vw", 
      quality: 85,
      priority: true, 
    },
    regular: {
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      quality: 80,
    },
    small: {
      sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw", 
      quality: 75,
    },
    custom: {
      sizes: props.sizes as string || "100vw",
      quality: 80,
    },
  };

  const config = categoryConfig[category];

  return (
    <picture className={`imgContainer ${containerClassName} radius__24`}>
      <Image
        {...props}
        className="img"
        sizes={props.sizes || config.sizes}
        quality={quality || config.quality} 
        priority={props.priority !== undefined ? props.priority : config.priority}
      />
    </picture>
  );
};

export default CustomImg;

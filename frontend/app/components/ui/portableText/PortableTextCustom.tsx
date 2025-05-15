import { urlFor } from "@/app/lib/sanity/urlFor";
import { Block, Image } from "@/app/types/globals.types";
import { PortableText } from "@portabletext/react";
import CustomImg from "../img/CustomImg";

interface Props {
  data: (Block | Image)[];
  imgContainerClassName?: string;
  hasImg: boolean;
}

const PortableTextCustom = ({
  hasImg = false,
  data,
  imgContainerClassName,
}: Props) => {
  const components = {
    types: {
      image: ({ value }: { value: Image }) => {
        if (!hasImg) return null;
        return (
          <CustomImg
            containerClassName={imgContainerClassName}
            src={urlFor(value).url()}
            alt="Content image"
            width={800}
            height={600}
          />
        );
      },
    },
  };
  return (
    <div className={`portableText`}>
      <PortableText value={data} components={components} />
    </div>
  );
};

export default PortableTextCustom;

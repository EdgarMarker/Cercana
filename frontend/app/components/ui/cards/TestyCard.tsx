"use client";
import React from "react";
import CustomImg from "../img/CustomImg";
import PortableTextCustom from "../portableText/PortableTextCustom";
import { Testimonial } from "@/app/types/home.types";

interface Props {
  data: Testimonial;
}
const TestyCard = ({ data }: Props) => {
  return (
    <div className="card card__testy radius__24">
      <div className="testy__cardHead">
        <ul>
          {data.img_stars?.map((item, idx) => (
            <CustomImg
              key={idx}
              containerClassName="testy__cardHeadStarsContainer"
              src={item.media.url}
              alt="calificaciones de estrellas"
              category="small"
              width={50}
              height={50}
            />
          ))}
        </ul>
        <PortableTextCustom hasImg={false} data={data.block_info} />
      </div>
      <p className="testy__cardName">{data.string_name}</p>
    </div>
  );
};

export default TestyCard;

"use client";
import "@splidejs/react-splide/css";
import React, { use, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CustomImg from "../img/CustomImg";
import PortableTextCustom from "../portableText/PortableTextCustom";

const SliderTesty = ({ data }) => {
  const [optionScreen, setOptionScreen] = React.useState({
    perPage: 3,
    type: "loop",
    gap: "5%",
    perMove: 1,
    pagination: false,
  });
  useEffect(() => {
    const updateOptions = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const isTablet = window.matchMedia("(min-width: 768px)").matches;
      setOptionScreen((prevOptions) => ({
        ...prevOptions,
        perPage: isDesktop ? 3 : isTablet ? 2 : 1,
      }));
    };
    updateOptions();
    window.addEventListener("resize", updateOptions);
    return () => {
      window.removeEventListener("resize", updateOptions);
    };
  }, []);
  return (
    <Splide options={optionScreen}>
      {data.ref_testimonials.map((item, idx) => (
        <SplideSlide key={idx}>
          <div className="testy__card radius__24">
            <div className="testy__cardHead">
              <ul>
                {item.img_stars.map((item, idx) => (
                  <CustomImg
                    key={idx}
                    containerClassName="testy__cardHeadStarsContainer"
                    src={item.media.url}
                    alt="calificaciones de estrellas"
                    width={50}
                    height={50}
                  />
                ))}
              </ul>
              <PortableTextCustom hasImg={false} data={item.block_info} />
            </div>
            <p className="testy__cardName">{item.string_name}</p>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SliderTesty;

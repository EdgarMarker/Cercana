// @ts-nocheck
"use client";
import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Image } from "@/app/types/globals.types";
import CustomImg from "../img/CustomImg";

interface Props {
  images: Image[];
}

const SliderAccommodationDetailHero = ({ images }: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Convertir images al formato que espera yet-another-react-lightbox
  const lightboxImages = images.map((image) => ({
    src: image.media.url,
    alt: `Image ${images.indexOf(image) + 1}`,
  }));

  return (
    <>
      {/* Slider Principal */}
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          perMove: 1,
          gap: "1rem",
          arrows: true,
          pagination: true,
        }}
      >
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <CustomImg
              src={image.media.url}
              alt={`Slide ${index + 1}`}
              width={800}
              height={600}
              category="xl"
              onClick={() => openLightbox(index)}
              style={{ cursor: "pointer" }}
            />
          </SplideSlide>
        ))}
      </Splide>

      {/* Lightbox con yet-another-react-lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={closeLightbox}
        index={currentIndex}
        slides={lightboxImages}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
};

export default SliderAccommodationDetailHero;

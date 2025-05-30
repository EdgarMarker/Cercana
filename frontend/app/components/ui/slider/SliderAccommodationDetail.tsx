// @ts-nocheck
"use client";
import React, { useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Image } from "@/app/types/globals.types";

interface Props {
  images: Image[];
}

const SliderAccommodationDetail = ({ images }: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

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
            <img
              src={image.media.url}
              alt={`Slide ${index + 1}`}
              onClick={() => openLightbox(index)}
            />
          </SplideSlide>
        ))}
      </Splide>

      {/* Lightbox */}
      {lightboxOpen && (
        <div>
          {/* Cerrar */}
          <button onClick={closeLightbox}>✕</button>

          {/* Navegación Anterior */}
          <button onClick={prevImage}>‹</button>

          {/* Imagen */}
          <img
            src={images[currentImage].media.url}
            alt={`Lightbox ${currentImage + 1}`}
          />

          {/* Navegación Siguiente */}
          <button onClick={nextImage}>›</button>

          {/* Indicador */}
          <div>
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default SliderAccommodationDetail;

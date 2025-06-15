// @ts-nocheck
"use client";
import { Image } from "@/app/types/globals.types";
import React, { useState } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Room } from "@/app/types/room.types";
import CustomImg from "../img/CustomImg";

interface Props {
  data: Room;
}
const SliderAccommodationDetailRooms = ({ data }: Props) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const lightboxImages = data.page.rooms.arrObject_room.map((image) => ({
    src: image.img_room.media.url,
    alt: `Image ${data.page.rooms.arrObject_room.indexOf(image) + 1}`,
  }));
  return (
    <>
      {/* Slider Principal */}
      <Splide
        hasTrack={false}
        options={{
          perPage: 2,
          perMove: 1,
          gap: "5%",
          arrows: true,
          pagination: false,
        }}
      >
        <div className="arrowsContainer">
          <div className="splide__arrows" />
        </div>
        <SplideTrack>
          {data.page.rooms.arrObject_room.map((image, index) => (
            <SplideSlide key={index}>
              <div className="card card__roomDetail">
                <CustomImg
                  hasIcon={true}
                  src={image.img_room.media.url}
                  alt={`Slide ${index + 1}`}
                  width={300}
                  height={200}
                  category="regular"
                  onClick={() => openLightbox(index)}
                  style={{ cursor: "pointer" }}
                />
                <h4>{image.string_name}</h4>
                <p>{image.string_dsc}</p>
              </div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>

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

export default SliderAccommodationDetailRooms;

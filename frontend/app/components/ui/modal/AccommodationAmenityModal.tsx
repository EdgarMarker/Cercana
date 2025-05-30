"use client";
import useModalData from "@/app/stores/useModalData.stores";
import React from "react";
import PopBtn from "../btn/PopBtn";

const AccommodationAmenityModal = () => {
  const { modalDataArray } = useModalData();
  return (
    <section
      className="accommodationAmenityModal"
      style={{ backgroundColor: "white" }}
    >
      <PopBtn
        showModal={false}
        text="close"
        whichModal="accommodationAmenityModal"
      />
      <ul>
        {modalDataArray.map((amenity, idx) => (
          <li key={idx}>
            <img src={amenity.img_icon.media.url} alt={amenity.title} />
            <p>{amenity.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AccommodationAmenityModal;

"use client";
import useModalData from "@/app/stores/useModalData.stores";
import React from "react";
import PopBtn from "../btn/PopBtn";

const AccommodationAmenityModal = () => {
  const { modalDataArray } = useModalData();
  return (
    <section className="accommodationAmenityModal">
      <div className="column__1">
        <PopBtn
          showModal={false}
          text="close"
          whichModal="accommodationAmenityModal"
          className="btn__primary"
        />
        <ul>
          {modalDataArray.map((amenity, idx) => (
            <li key={idx}>
              <img src={amenity.img_icon.media.url} alt={amenity.title} />
              <p>{amenity.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AccommodationAmenityModal;

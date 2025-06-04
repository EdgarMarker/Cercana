"use client";
import React from "react";
import PopBtn from "../btn/PopBtn";
import useModalData from "@/app/stores/useModalData.stores";

const AccommodationTextModal = () => {
  const { modalDataText } = useModalData();

  return (
    <section className="accommodationTextModal">
      <div className="column__1">
        <PopBtn
          className="btn__primary"
          showModal={false}
          text="close"
          whichModal="accommodationTextModal"
        />
        <p>{modalDataText}</p>
      </div>
    </section>
  );
};

export default AccommodationTextModal;

"use client";
import React from "react";
import PopBtn from "../btn/PopBtn";
import useModalData from "@/app/stores/useModalData.stores";

const AccommodationTextModal = () => {
  const modalDataText = useModalData((state) => state.modalDataText);

  return (
    <section
      className="accommodationTextModal"
      style={{ backgroundColor: "white" }}
    >
      <PopBtn
        className="btn__secondary"
        showModal={false}
        text="close"
        whichModal="accommodationTextModal"
      />
      <p>{modalDataText}</p>
    </section>
  );
};

export default AccommodationTextModal;

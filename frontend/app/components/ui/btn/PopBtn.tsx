"use client";
import { animationManager, useGSAP } from "@/app/lib/gsap/animation-manager";
import useModalData from "@/app/stores/useModalData.stores";
import React, { useEffect, useState } from "react";

type ModalType = "formModal" | "sheetInfoModal" | "accommodationTextModal";
interface Props {
  showModal: boolean;
  whichModal: ModalType;
  iconDirection?: string;
  text: string;
  className?: string;
  modalTextData?: string;
}
const PopBtn = ({
  iconDirection = "btn--right",
  text = "Explorar",
  showModal = false,
  whichModal = "formModal",
  className = "btn",
  modalTextData
}: Props) => {
  const { contextSafe } = useGSAP({ dependencies: [showModal] });
  const setModalDataText = useModalData(state => state.setModalDataText);

  const handleBtn = contextSafe(() => {
    if(modalTextData){
      setModalDataText(modalTextData);
    }

    animationManager.toggleModal({ open: showModal, className: whichModal });
  });
  return (
    <button
      className={`btn ${className} ${iconDirection}`}
      onClick={() => handleBtn()}
    >
      {text}
    </button>
  );
};

export default PopBtn;

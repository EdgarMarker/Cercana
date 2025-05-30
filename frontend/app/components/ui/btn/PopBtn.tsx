"use client";
import { animationManager, useGSAP } from "@/app/lib/gsap/animation-manager";
import useModalData from "@/app/stores/useModalData.stores";

type ModalType =
  | "formModal"
  | "sheetInfoModal"
  | "accommodationTextModal"
  | "accommodationAmenityModal"
  | "accommodationImgModal";
interface Props {
  showModal: boolean;
  whichModal: ModalType;
  iconDirection?: string;
  text: string;
  className?: string;
  modalDataText?: string;
  modalDataArray?: Array<any>;
}
const PopBtn = ({
  iconDirection = "btn--right",
  text = "Explorar",
  showModal = false,
  whichModal = "formModal",
  className = "btn",
  modalDataText = "",
  modalDataArray = [],
}: Props) => {
  const { contextSafe } = useGSAP({ dependencies: [showModal] });
  const { setModalDataText, setModalDataArray } = useModalData();

  const handleBtn = contextSafe(() => {
    if (modalDataText) {
      setModalDataText(modalDataText);
    }
    if (modalDataArray.length > 0) {
      setModalDataArray(modalDataArray);
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

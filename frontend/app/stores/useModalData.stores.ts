import { create } from "zustand";

interface Props {
  modalDataText: string;
  setModalDataText: (text: string) => void;
}

const useModalData = create<Props>((set) => ({
    modalDataText: "",
    setModalDataText: (text) => set({ modalDataText: text }),
}));

export default useModalData;

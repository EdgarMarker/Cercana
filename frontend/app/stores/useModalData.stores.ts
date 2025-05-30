import { create } from "zustand";

interface Props {
  modalDataText: string;
  setModalDataText: (text: string) => void;

  modalDataArray: Array<any>;
  setModalDataArray: (array: Array<any>) => void;
}

const useModalData = create<Props>((set) => ({
    modalDataText: "",
    setModalDataText: (text) => set({ modalDataText: text }),
    modalDataArray: [],
    setModalDataArray: (array) => set({ modalDataArray: array }),
}));

export default useModalData;

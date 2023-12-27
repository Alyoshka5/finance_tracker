import { useContext } from "react";
import ModalContext from "../context/ModalProvider";

export default function useModal() {
    return useContext(ModalContext);
}
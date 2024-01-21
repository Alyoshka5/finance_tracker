import useModal from "./useModal"

export default function useOpenModal() {
    const {setModalOpen, setContentComponent} = useModal();

    const openModal = (contentComponent) => {
        setContentComponent(contentComponent);
        setModalOpen(true);
    }

    return openModal;
}
import { useContext } from 'react';
import { ModalSetterContext, ModalState } from '../components/providers/ModalProvider';

export default function useModal() {
  const setModalState = useContext(ModalSetterContext);

  const openModal = <T,>({ component, props }: ModalState<T>) => {
    setModalState({ component, props });
  };

  const closeModal = () => {
    setModalState({ component: null, props: {} });
  };

  return { openModal, closeModal };
}

import { createContext, useState } from 'react';

const ModalContext = createContext({
  showModal: false,
  toggleModal: () => {},
});

export const ModalContextProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };
  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

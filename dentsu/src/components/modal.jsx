import React, { useRef } from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 94%;
  position: fixed;
  top: 30px;
`;
const ChildrenWrapper = styled.div`
  width: 80%;
  max-width: 1100px;
  display: flex;
  position: relative;
  justify-content: center;
`;

const Modal = ({ showModal, setShowModal, children, style }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <CloseWrapper>
            <p
              style={{ color: "white" }}
              onClick={() => setShowModal((prev) => !prev)}
            >
              Close
            </p>
          </CloseWrapper>
          <ChildrenWrapper style={style} showModal={showModal}>
            {children}
          </ChildrenWrapper>
        </Background>
      ) : null}
    </>
  );
};

export default Modal;

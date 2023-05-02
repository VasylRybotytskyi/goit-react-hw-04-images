import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { ModalContent, ModalImage, ModalWrapper } from './Modal.styled';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#ModalRoot');

export const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  }, [onClose]);

  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <ModalWrapper onClick={onOverlayClose}>
      <ModalContent>
        <ModalImage src={image.largeImageURL} alt="img" />
      </ModalContent>
    </ModalWrapper>,
    ModalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

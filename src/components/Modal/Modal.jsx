import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { ModalContent, ModalImage, ModalWrapper } from './Modal.styled';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#ModalRoot');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props.image;
    return createPortal(
      <ModalWrapper onClick={this.onOverlayClose}>
        <ModalContent>
          <ModalImage src={largeImageURL} alt="img" />
        </ModalContent>
      </ModalWrapper>,
      ModalRoot
    );
  }
}

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { GalleryImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShowModal] = useState(false);

  const onModal = () => {
    setShowModal(!shownModal);
  };
  return (
    <li>
      <GalleryImage onClick={onModal} src={item.webformatURL} alt="img" />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
};
ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};

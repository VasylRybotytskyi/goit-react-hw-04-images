import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';
export const ImageGallery = ({ items }) => {
  return (
    <>
      <GalleryList>
        {items.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </GalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
};

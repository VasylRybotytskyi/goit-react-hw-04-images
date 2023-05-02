import styled from 'styled-components';

export const GalleryListItem = styled.li``;

export const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.07);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

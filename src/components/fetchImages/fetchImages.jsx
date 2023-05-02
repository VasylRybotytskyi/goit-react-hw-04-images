import axios from 'axios';

export async function fetchImages(inputData, page) {
  const searchParams = new URLSearchParams({
    key: '2857319-3e88db59d4c1fb5299f0a9a73',
    q: inputData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);

  return images.data;
}

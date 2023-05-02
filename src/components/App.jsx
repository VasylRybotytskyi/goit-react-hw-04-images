import { useState } from 'react';
import { fetchImages } from './fetchImages/fetchImages';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobaStyle';

export const App = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  //Пошук відбувається за inputData, якщо він не пустий. Якщо hits порожній, статус встановлюється в idle, інакше - в resolved, а стан items, inputData, totalHits, page заповнюються з об'єкту fetchImages.
  const handleSubmit = async inputData => {
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.'); //Перевірка чи рядок не пустий
      return;
    }
    setStatus('pending');
    try {
      const { totalHits, hits } = await fetchImages(inputData, 1);
      if (hits.length < 1) {
        setStatus('idle');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        setItems(hits);
        setInputData(inputData);
        setTotalHits(totalHits);
        setPage(1);
        setStatus('resolved');
      }
    } catch (error) {
      setStatus('rejected');
    }
  };
  //Ця функція отримує наступну сторінку зображень з API, додає їх до поточних елементів та збільшує номер поточної сторінки. Якщо є помилка, статус встановлюється на "rejected".
  const onNextPage = async () => {
    setStatus('pending');
    try {
      const { hits } = await fetchImages(inputData, page + 1);
      setItems(prevState => [...prevState, ...hits]);
      setPage(prevState => prevState + 1);
      setStatus('resolved');
    } catch (error) {
      setStatus('rejected');
    }
  };

  let content;
  switch (status) {
    case 'idle':
      content = <Searchbar onSubmit={handleSubmit} />;
      break;
    case 'pending':
      content = (
        <>
          <GlobalStyle />
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={onNextPage} />}
        </>
      );
      break;
    case 'rejected':
      content = (
        <>
          <Searchbar onSubmit={handleSubmit} />
          <p>Something wrong, try later</p>
        </>
      );
      break;
    case 'resolved':
      content = (
        <>
          <GlobalStyle />
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={onNextPage} />
          )}
        </>
      );
      break;
    default:
      content = null;
  }

  return content;
};

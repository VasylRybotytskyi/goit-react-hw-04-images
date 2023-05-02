import React, { Component } from 'react';
import { fetchImages } from './fetchImages/fetchImages';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { GlobalStyle } from './GlobaStyle';

let page = 1;

export class App extends Component {
  state = {
    inputData: '',
    items: [], //масив який містить обєкти з даними про зобаження

    status: 'idle',
    totalHits: 0, //загальна кількість забражень
  };

  handleSubmit = async inputData => {
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.'); //Перевірка чи рядок не пустий
      return;
    }
    this.setState({ status: 'pending' });
    try {
      const { totalHits, hits } = await fetchImages(inputData, page);
      if (hits.length < 1) {
        this.setState({ status: 'idle' });
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        this.setState({
          items: hits,
          inputData,
          totalHits,
          status: 'resolved',
        });
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  onNextPage = async () => {
    this.setState({ status: 'pending' });

    try {
      const { hits } = await fetchImages(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };
  render() {
    const { totalHits, status, items } = this.state;
    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <GlobalStyle />
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div>
          <GlobalStyle />
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={items} />
          {totalHits > 12 && totalHits > items.length && (
            <Button onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}

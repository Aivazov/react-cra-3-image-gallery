import React, { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, promise, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Searchbar/Searchbar.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal.js';

// axios.defaults.headers.common['Authorization'] =
//   '31522217-1daa00f4dac69c1e930d1cd07';
const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&per_page=${pageSize}&image_type=photo&orientation=horizontal`
    )
    .then((res) => {
      // if (!res.data.totalHits) {
      //   console.log('images', this.state.images);
      // }
      console.log(res);
      return res.data.hits;
    });
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();

      // window.scrollBy({
      //   top: window.innerHeight - 200,
      //   behavior: 'smooth',
      // });
    }
  }

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
      showModal: false,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });
    fetchImages(options)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  render() {
    const { images, isLoading, showModal, error } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    // console.log(images);
    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
        {/* {images === [] &&
          toast.warning('We found no matches. Please try again')} */}
        {error && toast.warning(`Something went wrong: ${error.message}`)}
        <button type="button" onClick={this.toggleModal}>
          Open Modal
        </button>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <div>Hi there</div>
          </Modal>
        )}
        {/* <ul>
          {images.map(({ title, url }) => (
            <li key={title}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </li>
          ))}
        </ul> */}

        <ul className="gallery">
          {/* <ImageGalleryItem images={items} /> */}
          {images?.map((item) => (
            <li key={item.id}>
              <img src={item.webformatURL} width="240" alt="..." />
            </li>
          ))}
        </ul>

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}

        {isLoading && <Loader />}
      </div>
    );
  }
}

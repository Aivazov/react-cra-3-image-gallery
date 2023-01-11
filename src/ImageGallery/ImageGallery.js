import React, { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, promise, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './Searchbar/Searchbar.css';

// axios.defaults.headers.common['Authorization'] =
//   '31522217-1daa00f4dac69c1e930d1cd07';
const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';

const fetchImages = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&page=${currentPage}&per_page=${pageSize}&image_type=photo&orientation=horizontal`
    )
    .then((res) => res.data.hits);
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
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
  render() {
    const { images, isLoading, error } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
    console.log(images);
    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
        {/* {images === [] &&
          toast.warning('We found no matches. Please try again')} */}
        {error && toast.warning(`${error.message}`)}

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

        {shouldRenderLoadMoreButton && (
          <button
            type="button"
            className="btn btn-primary mt-3 mb-3"
            onClick={this.fetchImages}
          >
            Load More
          </button>
        )}

        {isLoading && (
          // <p style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>
          //   Loading...
          // </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BallTriangle
              height={70}
              width={70}
              radius={5}
              color="#3f51b5"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div>
        )}
      </div>
    );
  }
}

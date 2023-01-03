import React, { Component } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';
import './Searchbar2.css';

export default class GalleryByRequest extends Component {
  state = {
    searchName: '',
    pageNum: 1,
    galleryImages: [],
    loading: false,
    totalItems: 0,
    loadMoreBtn: false,
    error: null,
  };

  componentDidUpdate(prevProp, prevState) {
    console.log('this.state.searchName: ', this.state.searchName);

    if (prevState.searchName !== this.state.searchName) {
      // console.log('The search request was changed');
      this.setState({ loading: true });

      this.fetchData();
    }

    if (
      (prevState.galleryImages.length !== 0) &
      (prevState.galleryImages.length < this.state.galleryImages.length)
    ) {
      window.scrollBy({
        top: window.innerHeight - 200,
        behavior: 'smooth',
      });
    }
  }

  fetchData() {
    const { searchName, pageNum } = this.state;

    const URL = 'https://pixabay.com/api/';
    const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';
    const perPage = 12;
    this.makingFetch(URL, API_KEY, pageNum, perPage, searchName);
  }

  makingFetch(URL, API_KEY, pageNum, perPage, searchQuery) {
    fetch(
      `${URL}?key=${API_KEY}&q=${searchQuery}&page=${pageNum}&per_page=${perPage}&image_type=photo&orientation=horizontal`
    )
      .then((response) => response.json())
      .then((images) => {
        if (images.hits.length === 0) {
          return Promise.reject(new Error('The search was unsuccessful'));
        }
        this.handleResponse(images);
      })
      .catch((err) => this.setState({ error: err }));
  }

  handleResponse(images) {
    console.log('images, ', images);
    this.state.galleryImages.length === 0
      ? this.setState({
          galleryImages: images.hits,
          totalItems: images.totalHits,
          loading: false,
          loadMoreBtn: true,
          error: null,
        })
      : this.setState((prev) => ({
          galleryImages: [...prev.images.hits, ...images.hits],
          loading: false,
          loadMoreBtn: true,
          error: null,
        }));
    console.log('images after response ', images);
  }

  handleSearchingNameChange = (event) => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.searchName.trim() === '') {
      return toast.warning('Please enter images tag');
    }
    this.setState({ searchName: '', pageNum: 1, galleryImages: [] });
  };

  handleSearchName = (value) => {
    this.setState({ searchName: value });
  };

  handlePagination = () => {
    this.setState((prev) => ({ pageNum: prev.pageNum + 1 }));
    console.log(this.state.pageNum);
  };

  render() {
    const {
      searchName,
      pageNum,
      galleryImages,
      loading,
      totalItems,
      loadMoreBtn,
    } = this.state;
    const array = galleryImages;
    const restItems = totalItems - pageNum * 12;

    console.log();
    return (
      <>
        <Searchbar onSubmit={this.handleSearchName} />
        {loading && (
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
        <ul className="gallery">
          {/* <ImageGalleryItem images={items} /> */}
          {array?.map((item) => (
            <li key={item.id}>
              <img src={item.webformatURL} width="240" alt="..." />
            </li>
          ))}
        </ul>
        {loadMoreBtn && (
          <div>
            {/* <ImageGallery items={images} /> */}

            <button
              className="btn btn-primary mt-3 mb-3"
              onClick={this.handlePagination}
            >
              Load more
            </button>
          </div>
        )}
      </>
    );
  }
}

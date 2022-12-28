import { Component } from 'react';
// import * as ImageGalleryAPI from './services/gallery_api';

import Searchbar from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
// import { ImageGalleryItem } from './components/ImageGalleryItem/ImageGalleryItem';

export default class ImageFinderApp extends Component {
  state = {
    searchName: '',
    images: [],
    loading: false,
    error: null,
    status: 'idle',
  };

  async componentDidMount() {
    // try {
    //   this.setState({ loading: true });
    //   const images = await ImageGalleryAPI.getImages(this.state.searchName);
    //   this.setState({ images, loading: false });
    //   // console.log('images from API', this.state.images);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  handleSearchName = (value) => {
    this.setState({ searchName: value });
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      console.log('The search request was changed');

      // this.setState({ status: 'pending' });

      const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';
      // const PAGES = 'per_page=12';
      let page = 1;

      // fetch(
      //   `https://pixabay.com/api/?q=${this.state.searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      // )
      //   .then((response) => response.json())
      //   .then((images) => {
      //     console.log(images);
      //     // this.setState({ images, status: 'resolved' });
      //     this.setState({ images });
      //   });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.state.searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then((response) => {
            if (response.ok) {
              console.log('response is ok');
              return response.json();
            }
            return Promise.reject(
              new Error(
                `We do not have images with tags "${this.state.searchName}"`
              )
            );
          })
          .then((images) => {
            console.log(images);
            this.setState({ images });
          })
          .catch((error) => this.setState({ error }))
          .finally(this.setState({ loading: false, error: null }));
      }, 500);
    }
  }

  // async componentDidUpdate(prevProp, prevState) {
  // if (prevProp.searchName !== this.state.searchName) {
  //   console.log('Changing search request');
  //   try {
  //     this.setState({ loading: true });
  //     const images = await ImageGalleryAPI.changeSearchRequest(this.state.searchName);
  //     this.setState({ images, loading: false });
  //     // console.log('images from API', this.state.images);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';
  // const PER_PAGES = 12;
  // let page = 1;
  // if (prevProp.searchName !== this.state.searchName) {
  //   console.log('Changing search request');
  //   this.setState({ status: 'pending' });
  //   setTimeout(() => {
  //     fetch(
  //       `https://pixabay.com/api/?q=${this.state.searchName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGES}`
  //     )
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         }
  //         return Promise.reject(
  //           new Error(
  //             `We do not have images with name "${this.state.searchName}"`
  //           )
  //         );
  //       })
  //       .then((request) => {
  //         console.log(request);
  //         this.setState({ request, status: 'resolved' });
  //       })
  //       .catch((error) => this.setState({ error, status: 'rejected' }));
  //   }, 300);
  // }
  // }

  render() {
    // console.log('Searching Tag in the App:', this.state.searchName);
    // console.log(this.state.images);
    return (
      <div>
        {/* The Gallery will be here soon... */}
        <Searchbar onSubmit={this.handleSearchName} />
        <ImageGallery items={this.state.images} />
      </div>
    );
  }
}

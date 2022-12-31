import { Component } from 'react';

export default class GalleryAPI extends Component {
  // constructor() {}
  state = {
    searchQuery: '',
    page: 1,
  };

  fetchImages = (query) => {
    const API_KEY = '31522217-1daa00f4dac69c1e930d1cd07';
    const { searchQuery, page } = this.state;

    return fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        if (response.ok) {
          console.log('response is ok');
          return response.json();
        }
        return Promise.reject(
          new Error(`We do not have images with tag "${query}"`)
        );
      })
      .then((searchQuery) => {
        // console.log('searchQuery', searchQuery);
        this.setState({ searchQuery });
        this.incrementPage();
        // console.log('page', page);
        return searchQuery;
      });
    // .catch((error) => this.setState({ error }))
    // .finally(
    //   this.setState({ loading: false, error: null, paginationBtn: true })
    // );
  };

  incrementPage = () => {
    this.setState({ page: (this.state.page += 1) });
    // console.log('this.state.page', this.state.page);
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };
}

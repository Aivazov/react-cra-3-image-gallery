import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import ImageFinderApp from './components/ImageFinderApp';
import GalleryByRequest from './GalleryByRequest/GalleryByRequest';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <ImageFinderApp /> */}
      {/* <GalleryByRequest /> */}
      <ImageGallery />
    </div>
  );
}

export default App;

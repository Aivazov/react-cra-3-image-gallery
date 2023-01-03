import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import ImageFinderApp from './components/ImageFinderApp';
import GalleryByRequest from './GalleryByRequest/GalleryByRequest'
import './App.css';

function App() {
  return (
    <div className="App">
      <ImageFinderApp />
      {/* <GalleryByRequest /> */}
    </div>
  );
}

export default App;

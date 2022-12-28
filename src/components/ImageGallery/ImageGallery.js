import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.css';

export const ImageGallery = (items) => {
  // console.log(items.items.hits);
  const array = items.items.hits;
  return (
    <ul className="gallery">
      {/* <ImageGalleryItem images={items} /> */}
      {array?.map((item) => (
        <li key={item.id}>
          <img src={item.webformatURL} width="240" alt='...' />
        </li>
      ))}
    </ul>
  );
};

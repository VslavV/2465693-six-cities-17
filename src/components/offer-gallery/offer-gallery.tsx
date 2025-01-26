import { MAX_IMAGES_OFFER_COUNT } from '../../const';
import GalleryItem from '../gallery-item/gallery-item';
import { memo } from 'react';

type OfferGalleryProps ={
  images: string[];
}

function OfferGallery({images}:OfferGalleryProps) {

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0,MAX_IMAGES_OFFER_COUNT).map((item)=> <GalleryItem key={item} src={item}/>) }
      </div>
    </div>
  );
}
export default memo(OfferGallery);

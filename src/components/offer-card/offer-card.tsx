import { RentalOffer } from '../../types/offer';
import { capitalizeLetter } from '../../utils';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { getRatingWidth } from '../../utils';
import { CardImageSize, RoutePath } from '../../const';
import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { memo } from 'react';

type OfferCardProps = {
  offer: RentalOffer;
  cardType: 'cities' | 'favorites'| 'near-places';
  onOfferCardMouseEnter?: (id: string) => void;
  onOfferCardMouseLeave?: () => void;
};

function OfferCard({ offer, cardType, onOfferCardMouseEnter = () => {}, onOfferCardMouseLeave }: OfferCardProps): JSX.Element {
  const { id, title, type, price, previewImage, isFavorite, isPremium, rating } = offer;

  return (

    <article className={`${cardType}__card place-card`} onMouseEnter={() => onOfferCardMouseEnter(offer.id)} onMouseLeave={onOfferCardMouseLeave}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={generatePath(RoutePath.Offer, {id})}>
          <img
            className="place-card__image"
            src={previewImage}
            width={CardImageSize[cardType].width}
            height={CardImageSize[cardType].height}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={isFavorite} offerId={id} pageType={'place-card'}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingWidth(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">

          <Link to={generatePath(RoutePath.Offer, {id})}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeLetter(type)}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard);

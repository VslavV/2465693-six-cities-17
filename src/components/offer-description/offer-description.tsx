import { AuthorizationStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector';
import { selectReviews } from '../../store/reviews/reviews-selector';
import { SelectedRentalOffer } from '../../types/offer';
import { capitalizeLetter, getRatingWidth } from '../../utils';
import BookmarkButton from '../bookmark-button/bookmark-button';
import FormComment from '../form-comment/form-comment';
import OfferGallery from '../offer-gallery/offer-gallery';
import OfferHost from '../offer-host/offer-host';
import OfferInsideList from '../offer-inside-list/offer-inside-list';
import ReviewList from '../review-list/review-list';

type OfferDescriptionProps ={
  chosenOffer: SelectedRentalOffer;
}

function OfferDescription({chosenOffer}:OfferDescriptionProps) {
  const reviews = useAppSelector(selectReviews);
  const isAuthorization = useAppSelector(selectAuthorizationStatus);
  const {id, title, description, type, price, images, goods, host, isFavorite, isPremium, rating, bedrooms, maxAdults} = chosenOffer;

  return (
    <>
      <OfferGallery images={images}/>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {title}
            </h1>
            <BookmarkButton isFavorite={isFavorite} offerId={id} pageType={'offer'}/>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${getRatingWidth(rating)}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {capitalizeLetter(type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {bedrooms} {bedrooms < 2 ? 'Bedroom' : 'Bedrooms'}
            </li>
            <li className="offer__feature offer__feature--adults">
                  Max {maxAdults } {maxAdults < 2 ? 'Adult' : 'Adults'}
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <OfferInsideList goods={goods}/>
          <OfferHost host={host} description={description}/>

          <section className="offer__reviews reviews">
            <ReviewList reviews={reviews}/>
            {(isAuthorization === AuthorizationStatus.Auth && id)
            && <FormComment offerId={id}/>}
          </section>
        </div>
      </div>
    </>
  );
}

export default OfferDescription;

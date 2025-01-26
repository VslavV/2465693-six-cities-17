import FavoriteEmpty from '../favority-empty/favorite-empty';
import OfferCard from '../offer-card/offer-card';
import { memo } from 'react';
import { RoutePath } from '../../const';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { RentalOffer } from '../../types/offer';
import { setCity } from '../../store/app/app-slice';
import { getOfferFavoriteGroup } from '../../group-favorites';

type FavoriteListProps = {
  offers: RentalOffer[];
}

function FavoriteList({offers}: FavoriteListProps): JSX.Element {
  const offerFavoriteGroup = getOfferFavoriteGroup({ offers });
  const dispatch = useAppDispatch();
  if (!offers.length) {
    return <FavoriteEmpty/>;
  }

  return(
    <ul className="favorites__list">
      {Object.entries(offerFavoriteGroup).map(([city, cityOffers]) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={RoutePath.Index} onClick={()=>dispatch(setCity(city))}>
                <span>{city}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} cardType="favorites" />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default memo(FavoriteList);

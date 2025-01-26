import Map from '../../components/map/map';
import Header from '../../components/header/header';
import LoadingPage from '../loading-page/loading-page';
import NearPlaces from '../../components/near-places/near-places';
import OfferDescription from '../../components/offer-description/offer-description';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { MAX_VISIBLE_NEARBY_OFFER } from '../../const';
import { fetchOfferAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectReviewsLoading } from '../../store/reviews/reviews-selector';
import { selectChosenOffer, selectNearByLoading, selectNearByOffers, selectOfferLoading } from '../../store/offers/offers-selector';
import { selectFavoritesLoadingStatus } from '../../store/favorites/favorite-selector';

function OfferPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const chosenOffer = useAppSelector(selectChosenOffer);

  useEffect(() =>{
    if (id && (!chosenOffer || chosenOffer?.id !== id)) {
      dispatch(fetchOfferAction(id));
    }
  },[id, chosenOffer, dispatch]);

  const nearByOffers = useAppSelector(selectNearByOffers);
  const visibleNearPlacesOffers = nearByOffers.slice(0, MAX_VISIBLE_NEARBY_OFFER);
  const isOfferLoading = useAppSelector(selectOfferLoading);
  const isNearPlacesLoading = useAppSelector(selectNearByLoading);
  const isReviewsLoading = useAppSelector(selectReviewsLoading);
  const isFavoritesLoading = useAppSelector(selectFavoritesLoadingStatus);

  if (!chosenOffer || isOfferLoading || isNearPlacesLoading || isReviewsLoading || isFavoritesLoading) {
    return (
      <LoadingPage />
    );
  }

  const offers = [...visibleNearPlacesOffers, chosenOffer];

  return (
    <div className="page">
      <Helmet>
        <title>6 городов. Предложение</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferDescription chosenOffer={chosenOffer}/>
          <Map className={'offer__map'} offers={offers} activeOfferCardId={chosenOffer.id}/>
        </section>
        <NearPlaces nearPlacesOffers={visibleNearPlacesOffers}/>
      </main>
    </div>
  );
}

export default OfferPage;

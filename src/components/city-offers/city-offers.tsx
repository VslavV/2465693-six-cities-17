import OfferCardsList from '../offer-cards-list/offer-cards-list';
import Sorting from '../sorting/sorting';
import Map from '../map/map';
import { useCallback, useState, memo } from 'react';
import { RentalOffer } from '../../types/offer';

type CityOffersProps = {
  currentCityOffers: RentalOffer[];
  activeLocation: string;
};

function CityOffers({currentCityOffers, activeLocation}:CityOffersProps): JSX.Element {
  const [activeOfferCardId, setActiveOfferCardId] = useState<string | null>('');
  const offerCardMouseEnterHandler = useCallback((id: string): void => {
    setActiveOfferCardId(id);
  },[]);
  const offerCardMouseLeaveHandler = useCallback((): void => {
    setActiveOfferCardId(null);
  },[]);

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{currentCityOffers.length} {(currentCityOffers.length > 1 ? 'places' : 'place')} to stay in {activeLocation}</b>
        <Sorting />
        <OfferCardsList offers={currentCityOffers} onOfferCardMouseEnterHandler={offerCardMouseEnterHandler} onOfferCardMouseLeaveHandler={offerCardMouseLeaveHandler} />;
      </section>

      <div className="cities__right-section">
        {!!currentCityOffers.length && <Map className={'cities__map'} offers={currentCityOffers} activeOfferCardId={activeOfferCardId}/>}
      </div>
    </>
  );
}
export default memo(CityOffers);

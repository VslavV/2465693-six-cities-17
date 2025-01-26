import { useAppSelector } from '../../hooks';
import { RentalOffer } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';
import { getSortedOfferCards } from '../../utils';
import { selectCurrentSort } from '../../store/app/app-selector';
import { memo } from 'react';

type OfferCardsListProps = {
  offers: RentalOffer[];
  onOfferCardMouseEnterHandler: (id: string) => void;
  onOfferCardMouseLeaveHandler: () => void;
};

function OfferCardsList({offers, onOfferCardMouseEnterHandler, onOfferCardMouseLeaveHandler}: OfferCardsListProps): JSX.Element {
  const currentSort = useAppSelector(selectCurrentSort);
  let sortedOfferCards: RentalOffer[] = [];
  sortedOfferCards = getSortedOfferCards(offers, currentSort);

  return (
    <div className="cities__places-list places__list tabs__content">
      {sortedOfferCards.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardType="cities"
          onOfferCardMouseEnter={onOfferCardMouseEnterHandler}
          onOfferCardMouseLeave={onOfferCardMouseLeaveHandler}
        />
      ))}
    </div>
  );
}
export default memo(OfferCardsList);

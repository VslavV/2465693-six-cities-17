import { ONE_STAR_RATING, SortOption } from './const';
import { RentalOffer, SelectedRentalOffer } from './types/offer';
import { OfferReview } from './types/review';
import { LOCATIONS } from './const';

//Функция возвращающая слово с заглавной буквы
const capitalizeLetter = (word: string) => word[0].toUpperCase() + word.slice(1);

//Функция расчета значения ширины рэйтинга
const getRatingWidth = (value: number) => Math.round(value) * ONE_STAR_RATING;

//Функция преобразования формата даты
const getDateFormat = (dateString: string): string => {
  const date: Date = new Date(dateString);
  const option: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  const formatedDate = date.toLocaleDateString('en-US', option);
  return formatedDate;
};

//сортировка массива объектов по дате
const sortToDate = (unSortedArrey:OfferReview[]) => {
  const sortedArray = unSortedArrey.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sortedArray;
};

//сортировка карточек
const sortByHighToLow = (a: RentalOffer, b: RentalOffer) => b.price - a.price;

const sortByLowToHigh = (a: RentalOffer, b: RentalOffer) => a.price - b.price;

const sortByTopRated = (a: RentalOffer, b: RentalOffer) => b.rating - a.rating;

const getSortedOfferCards = (offers: RentalOffer[], currentSort: SortOption) =>{
  switch (currentSort) {
    case SortOption.LowToHigh:
      return [...offers].sort(sortByLowToHigh);
    case SortOption.HighToLow:
      return [...offers].sort(sortByHighToLow);
    case SortOption.TopRated:
      return [...offers].sort(sortByTopRated);
    case SortOption.Popular:
      return [...offers];
  }
};

//получаем случайный город
const getRandomCity = ():string=> LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

const changeFavoriteInState = (updateOffer:RentalOffer|SelectedRentalOffer, offers:RentalOffer[]):RentalOffer[] => {
  const {id, isFavorite} = updateOffer;
  offers.find((offer, index) => {
    if (offer.id === id) {
      const changedOffer = {...offer, isFavorite: isFavorite};
      const changedOffers = offers.splice(index, 1, changedOffer);
      return changedOffers;
    }
  });
  return offers;
};

export { capitalizeLetter, getRatingWidth, getDateFormat, sortToDate, getSortedOfferCards, getRandomCity, changeFavoriteInState };

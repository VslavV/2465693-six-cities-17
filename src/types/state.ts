import { AuthorizationStatus, SortOption } from '../const';
import { store } from '../store';
import { RentalOffer, SelectedRentalOffer } from './offer';
import { OfferReview } from './review';
import { UserData } from './user-data';

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppSlice = {
  city: string;
  currentSort: SortOption;
}

export type OffersSlice = {
  offers: RentalOffer[];
  chosenOffer: SelectedRentalOffer|null;
  nearPlaces: RentalOffer[];
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isNearbyLoading: boolean;
}

export type AuthSlice = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData|null;
}

export type ReviewsSlice = {
  reviews: OfferReview[];
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
}

export type FavoritesSlice = {
  favorites: RentalOffer[];
  isFavoritesLoading: boolean;
  isFavoritesPosting: boolean;
}

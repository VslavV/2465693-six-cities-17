import { changeCity, loadOffers, changeSorting, setOffersLoadingStatus, loadOffer, loadNearPlaces, loadReviews, setReviewsLoadingStatus, setNearByLoadingStatus, setOfferLoadingStatus, setReviewPostingStatus, setReviewPostingError } from './action';
import { AuthorizationStatus, DEFAULT_CITY, SortOption} from '../const';
import { createReducer } from '@reduxjs/toolkit';
import { RentalOffer, SelectedRentalOffer } from '../types/offer';
import { UserData } from '../types/user-data';
import { OfferReview } from '../types/review';
import { checkAuthAction, loginAction, logoutAction } from './api-action';

type InitialState = {
  city: string;
  offers: RentalOffer[];
  currentSort: SortOption;
  selectedOffer: SelectedRentalOffer|null;
  nearPlaces: RentalOffer[];
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData|null;
  reviews: OfferReview[];
  favorites:RentalOffer[];
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  isReviewsLoading: boolean;
  isReviewPosting: boolean;
  isReviewPostingError: boolean;
  isNearbyLoading: boolean;
  isFavoriteLoading: boolean;
};

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  currentSort: SortOption.Popular,
  selectedOffer: null,
  nearPlaces: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
  reviews: [],
  favorites: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isReviewsLoading: false,
  isReviewPosting: false,
  isReviewPostingError: false,
  isNearbyLoading: false,
  isFavoriteLoading: false,
};

const reducer = createReducer(initialState, (builder)=> {
  builder
    .addCase(changeCity, (state, action) =>{
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.selectedOffer = action.payload;
    })
    .addCase(loadNearPlaces, (state, action) => {
      state.nearPlaces = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.currentSort = action.payload;
    })
    .addCase(checkAuthAction.fulfilled, (state, action)=> {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state)=> {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, action)=> {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userInfo = action.payload;
    })
    .addCase(loginAction.rejected, (state)=> {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userInfo = null;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setNearByLoadingStatus, (state, action) => {
      state.isNearbyLoading = action.payload;
    })
    .addCase(setReviewsLoadingStatus, (state, action) => {
      state.isReviewsLoading = action.payload;
    })
    .addCase(setReviewPostingStatus, (state, action) => {
      state.isReviewPosting = action.payload;
    })
    .addCase(setReviewPostingError, (state, action) => {
      state.isReviewPostingError = action.payload;
    });
});

export {reducer};

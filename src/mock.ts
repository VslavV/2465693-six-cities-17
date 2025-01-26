import { ThunkDispatch } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_CITY, MAX_IMAGES_OFFER_COUNT, MAX_VISIBLE_REVIEW, NameSpace, SortOption } from './const';
import { CityOffer, HostType, LocationOffer, RentalOffer, SelectedRentalOffer } from './types/offer';
import { OfferReview } from './types/review';
import { UserData } from './types/user-data';
import faker from 'faker';
import { createAPI } from './services/api';
import { Action } from 'redux';
import { AppState } from './types/state';
import { getRandomCity } from './utils';

const MAX_REVIEW_RATING = 5;

export type AppThunkDispatch = ThunkDispatch<AppState, ReturnType<typeof createAPI>, Action>;

export const makeFakeLocation = (): LocationOffer => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number(),
});

export const makeFakeCity = (): CityOffer => ({
  name: getRandomCity(),
  location: makeFakeLocation(),
});

export const makeFakeHost = (): HostType => ({
  isPro: faker.datatype.boolean(),
  name: faker.internet.userName(),
  avatarUrl: faker.datatype.string(),
});

export const makeFakeOffer = (): RentalOffer => ({
  id: faker.datatype.string(),
  title: faker.datatype.string(),
  type: faker.datatype.string(),
  price: faker.datatype.number(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number(MAX_REVIEW_RATING),
  previewImage: faker.datatype.string(),
});

export const makeFakeChoosenOffer = (): SelectedRentalOffer => ({
  id: faker.datatype.string(),
  title: faker.datatype.string(),
  description: faker.datatype.string(),
  type: faker.datatype.string(),
  price: faker.datatype.number(),
  images: new Array(MAX_IMAGES_OFFER_COUNT).fill(null).map(() => faker.datatype.string()),
  city: makeFakeCity(),
  location: makeFakeLocation(),
  goods: [faker.datatype.string()],
  host: makeFakeHost(),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.number(MAX_REVIEW_RATING),
  bedrooms: faker.datatype.number(),
  maxAdults: faker.datatype.number(),
});

export const makeFakeUserData = (): UserData => ({
  email: faker.internet.email(),
  id: faker.datatype.number(),
  token: faker.datatype.string(),
  name: faker.internet.userName(),
  avatarUrl: faker.system.filePath(),
  isPro: faker.datatype.boolean(),
});

export const makeFakeReview = (): OfferReview => ({
  comment: faker.datatype.string(),
  date: String(faker.datatype.datetime()),
  id: faker.datatype.string(),
  rating: faker.datatype.number(MAX_REVIEW_RATING),
  user: makeFakeHost(),
});

const TEST_FAVORITES_COUNT = 7;

export const mockFavorites = new Array(TEST_FAVORITES_COUNT).fill(null).map(() => makeFakeOffer());
export const mockFavorite = { ...makeFakeOffer(), isFavorite: true };
export const mockNotFavorite = { ...makeFakeOffer(), isFavorite: false };

export const mockReviews = new Array(MAX_VISIBLE_REVIEW).fill(null).map((_v, i) => ({ ...makeFakeReview(), id: String(i) }));

export const mockOffers = new Array(50).fill(null).map((_v, i) => ({ ...makeFakeOffer(), id: String(i) }));

export const mockOffer = makeFakeChoosenOffer();

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const mockUserData = makeFakeUserData();

export const makeFakeStore = (initialState?: Partial<AppState>): AppState => ({
  [NameSpace.Auth]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: mockUserData,
  },
  [NameSpace.Favorites]: {
    favorites: mockFavorites,
    isFavoritesLoading: false,
    isFavoritesPosting: false,
  },
  [NameSpace.App]: {
    city: DEFAULT_CITY,
    currentSort: SortOption.Popular
  },
  [NameSpace.Offers]: {
    offers: mockOffers,
    chosenOffer: mockOffer,
    nearPlaces: mockOffers,
    isOffersLoading: false,
    isOfferLoading: false,
    isNearbyLoading: false,
  },
  [NameSpace.Reviews]: {
    reviews: mockReviews,
    isReviewsLoading: false,
    isReviewPosting: false,
  },
  ...initialState ?? {},
});

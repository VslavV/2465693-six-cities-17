import {APIRoute, RoutePath} from '../const';
import {redirectToRoute} from './action';
import {saveToken, dropToken} from '../services/token';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { RentalOffer, SelectedRentalOffer } from '../types/offer.js';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { ChangeFavoriteStatusType, ThunkType } from '../types/api.js';
import { OfferReview } from '../types/review.js';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkType>();

export const fetchOffersAction = createAsyncThunk<RentalOffer[], undefined, ThunkType>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<RentalOffer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchNearbyAction = createAsyncThunk<RentalOffer[], string, ThunkType>(
  'data/fetchNearBy',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<RentalOffer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<OfferReview[], string, ThunkType>(
  'reviews/fetchReviews',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferReview[]>(`${APIRoute.Reviews}/${offerId}`);
    return data;
  },
);

export const fetchOfferAction = createAppAsyncThunk<SelectedRentalOffer, string, ThunkType>(
  'data/fetchOffer',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<SelectedRentalOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(fetchNearbyAction(offerId));
      dispatch(fetchReviewsAction(offerId));
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(redirectToRoute(RoutePath.NotFound));
      }
      throw error;
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<RentalOffer[], undefined, ThunkType>(
  'favorite/fetchFavorites',
  async (_, {extra: api}) => {
    const {data} = await api.get<RentalOffer[]>(APIRoute.Favorites);
    return data;
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<RentalOffer, ChangeFavoriteStatusType, ThunkType>(
  'favorite/changeFavoriteStatus',
  async ({status, offerId}, { extra: api}) => {
    const {data} = await api.post<RentalOffer>(`${APIRoute.Favorites}/${offerId}/${status}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkType>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    if (data) {
      dispatch(fetchFavoritesAction());
    }
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, ThunkType>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(fetchOffersAction());
      dispatch(fetchFavoritesAction());
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(redirectToRoute(RoutePath.NotFound));
      }
      throw error;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkType>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction());
  },
);

export const postReviewAction = createAsyncThunk<OfferReview, {offerId: string; postFormData: { comment: string; rating: number } }, ThunkType>(
  'reviews/postReview',
  async ({offerId, postFormData}, {extra: api}) => {
    const {data} = await api.post<OfferReview>(`${APIRoute.Reviews}/${offerId}`, postFormData);
    return data;
  },
);

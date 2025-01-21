import { NameSpace } from '../../const';
import { createSlice } from '@reduxjs/toolkit';
import { changeFavoriteStatusAction, fetchNearbyAction, fetchOfferAction, fetchOffersAction } from '../api-actions';
import { OffersSlice } from '../../types/state';
import { changeFavoriteInState } from '../../utils';
import { toast } from 'react-toastify';

const initialState: OffersSlice = {
  offers: [],
  chosenOffer: null,
  nearPlaces: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isNearbyLoading: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        toast.error('Ошибка загрузки предложений');
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.chosenOffer = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
        toast.error('Ошибка загрузки предложения');
      })
      .addCase(fetchNearbyAction.pending, (state) => {
        state.isNearbyLoading = true;
      })
      .addCase(fetchNearbyAction.fulfilled, (state, action) => {
        state.isNearbyLoading = false;
        state.nearPlaces = action.payload;
      })
      .addCase(fetchNearbyAction.rejected, (state) => {
        state.isNearbyLoading = false;
        toast.error('Ошибка загрузки предложений неподалёку');
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        if (state.chosenOffer && state.chosenOffer.id === action.payload.id) {
          state.chosenOffer.isFavorite = action.payload.isFavorite;
        }
        state.offers = changeFavoriteInState(action.payload, state.offers);
        state.nearPlaces = changeFavoriteInState(action.payload, state.nearPlaces);
      });
  },
});

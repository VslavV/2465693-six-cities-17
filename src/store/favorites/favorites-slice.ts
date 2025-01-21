import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoritesSlice } from '../../types/state';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../api-actions';

const initialState: FavoritesSlice = {
  favorites: [],
  isFavoritesLoading: false,
  isFavoritesPosting: false,
};

export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(changeFavoriteStatusAction.pending, (state) => {
        state.isFavoritesPosting = true;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        state.isFavoritesPosting = false;
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter((offer)=> offer.id !== action.payload.id);
        }
      });
  }
});

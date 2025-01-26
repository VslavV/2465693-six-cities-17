import { mockFavorite, mockFavorites, mockNotFavorite } from '../../mock';
import { changeFavoriteStatusAction, fetchFavoritesAction } from '../api-actions';
import { favoritesSlice } from './favorites-slice';

const state = {
  favorites: [],
  isFavoritesLoading: false,
  isFavoritesPosting: false,
};

describe('Favorite Slice', () => {
  it('should return initial state without parameters', () => {
    const result = favoritesSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(state);
  });

  describe('fetchFavoritesAction test', () => {
    it('should set favorites with given offers if fetchFavoritesAction is fulfilled', () => {
      const expectedState = {
        favorites: mockFavorites,
        isFavoritesLoading: false,
        isFavoritesPosting: false,
      };
      const result = favoritesSlice.reducer(state, { payload: mockFavorites, type: fetchFavoritesAction.fulfilled.type });

      expect(result).toEqual(expectedState);
    });
    it('should update isFavoritesLoading if fetchFavoritesAction is pending', () => {
      const expectedState = { ...state, isFavoritesLoading: true };
      const result = favoritesSlice.reducer(state, { type: fetchFavoritesAction.pending.type });

      expect(result).toEqual(expectedState);
    });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should push given offer to favorites if changeFavoriteStatusAction is fulfilled and isFavorite is "true"', () => {
      const expectedState = {
        favorites: [...state.favorites, mockFavorite],
        isFavoritesLoading: false,
        isFavoritesPosting: false,
      };
      const result = favoritesSlice.reducer(state, { payload: mockFavorite, type: changeFavoriteStatusAction.fulfilled.type });

      expect(result).toEqual(expectedState);
    });
    it('should delete favorite offer from favorites if changeFavoriteStatusAction is fulfilled and isFavorite is "false"', () => {
      const initialState = {
        favorites: [mockNotFavorite],
        isFavoritesLoading: false,
        isFavoritesPosting: false,
      };
      const expectedState = {
        favorites: initialState.favorites.filter((offer) => offer.id !== mockNotFavorite.id),
        isFavoritesLoading: false,
        isFavoritesPosting: false,
      };
      const result = favoritesSlice.reducer(initialState, { payload: mockNotFavorite, type: changeFavoriteStatusAction.fulfilled.type });
      expect(result).toEqual(expectedState);
    });
    it('should update isFavoritesPosting if changeFavoriteStatusAction is pending', () => {
      const expectedState = { ...state, isFavoritesPosting: true };
      const result = favoritesSlice.reducer(state, { type: changeFavoriteStatusAction.pending.type });

      expect(result).toEqual(expectedState);
    });
  });
});

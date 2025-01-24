import { NameSpace } from '../../const';
import { AppState } from '../../types/state';

export const selectFavorites = (state: AppState) => state[NameSpace.Favorites].favorites;
export const selectFavoritesLoadingStatus = (state: AppState) => state[NameSpace.Favorites].isFavoritesLoading;
export const selectFavoritesPostingStatus = (state: AppState) => state[NameSpace.Favorites].isFavoritesPosting;

export const selectFavoriteOfferById = (state: AppState, offerId:string) => state[NameSpace.Favorites].favorites.findIndex((offer)=> offer.id === offerId) !== -1;

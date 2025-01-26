import { makeFakeChoosenOffer, mockOffers } from '../../mock';
import { OffersSlice } from '../../types/state';
import { fetchNearbyAction, fetchOfferAction, fetchOffersAction } from '../api-actions';
import { offersSlice } from './offers-slice';

const state:OffersSlice = {
  offers: [],
  chosenOffer: null,
  nearPlaces: [],
  isOffersLoading: false,
  isOfferLoading: false,
  isNearbyLoading: false,
};

describe('Offers slice', () => {
  it('should return initial state without parameters', () => {
    const result = offersSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(state);
  });

  describe('fetchOffersAction', () => {
    it('should set offers with given offers if fetchOffersAction is fulfilled', () => {
      const expectedState = {
        ...state,
        offers: mockOffers,
        isOffersLoading: false
      };
      const result = offersSlice.reducer(state, { payload: mockOffers, type: fetchOffersAction.fulfilled.type });

      expect(result).toEqual(expectedState);
    });
    it('should update isOffersLoading if fetchOffersAction is pending', () => {
      const expectedState = { ...state, isOffersLoading: true };
      const result = offersSlice.reducer(state, { type: fetchOffersAction.pending.type });

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchOfferAction', () => {
    it('should set offer with given offer if fetchOfferAction is fulfilled', () => {
      const currentOffer = makeFakeChoosenOffer();
      const expectedState = {
        ...state,
        chosenOffer: currentOffer,
        isOfferLoading: false
      };
      const result = offersSlice.reducer(state, { payload: currentOffer, type: fetchOfferAction.fulfilled.type });

      expect(result).toEqual(expectedState);
    });
    it('should update isOfferLoading if fetchOfferAction is pending', () => {
      const expectedState = { ...state, isOfferLoading: true };
      const result = offersSlice.reducer(state, { type: fetchOfferAction.pending.type });

      expect(result).toEqual(expectedState);
    });
  });
  describe('fetchNearbyAction', () => {
    it('should set offers with given offers if fetchNearbyAction is fulfilled', () => {
      const expectedState = {
        ...state,
        nearPlaces: mockOffers,
        isNearbyLoading: false
      };
      const result = offersSlice.reducer(state, { payload: mockOffers, type: fetchNearbyAction.fulfilled.type });

      expect(result).toEqual(expectedState);
    });
    it('should update isNearbyLoading if fetchNearbyAction is pending', () => {
      const expectedState = { ...state, isNearbyLoading: true };
      const result = offersSlice.reducer(state, { type: fetchNearbyAction.pending.type });

      expect(result).toEqual(expectedState);
    });
  });
});

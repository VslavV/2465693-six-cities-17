import { makeFakeReview, mockReviews } from '../../mock';
import { ReviewsSlice } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { reviewsSlice } from './reviews-slice';

const state:ReviewsSlice = {
  reviews : [],
  isReviewsLoading: false,
  isReviewPosting: false,
};

describe('Reviews slice', () => {
  it('should return initial state without parameters', () => {
    const result = reviewsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(state);
  });

  describe('fetchReviewsAction test', () => {
    it('should set reviews with given reviews if fetchFavoritesAction is fulfilled', () => {
      const expectedState = {
        ...state,
        reviews: mockReviews,
      };
      const result = reviewsSlice.reducer(state, { payload: mockReviews, type: fetchReviewsAction.fulfilled.type });

      expect(result).toEqual(expectedState);
    });
    it('should update isReviewsLoading if fetchReviewsAction is pending', () => {
      const expectedState = { ...state, isReviewsLoading: true };
      const result = reviewsSlice.reducer(state, { type: fetchReviewsAction.pending.type });

      expect(result).toEqual(expectedState);
    });
  });

  describe('postReviewAction test', () => {
    it('should update isReviewPosting if postReviewAction is pending', () => {
      const expectedState = { ...state, isReviewPosting: true };
      const result = reviewsSlice.reducer(state, { type: postReviewAction.pending.type });

      expect(result).toEqual(expectedState);
    });

    it('should set reviews with given reviews and update isReviewPosting if postReviewAction is fulfilled', () => {
      const newReview = makeFakeReview();
      const expectedState = {
        ...state,
        reviews: [newReview],
        isReviewPosting: false,
      };
      const result = reviewsSlice.reducer(state, { payload: newReview, type: postReviewAction.fulfilled.type });

      expect(result).toEqual(expectedState);
    });
  });
});

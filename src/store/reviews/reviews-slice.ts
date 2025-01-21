import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewsSlice } from '../../types/state';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: ReviewsSlice = {
  reviews: [],
  isReviewsLoading: false,
  isReviewPosting: false,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.isReviewsLoading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoading = false;
        toast.error('Ошибка загрузки комментариев');
      })
      .addCase(postReviewAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.isReviewPosting = false;
        state.reviews = [action.payload, ...state.reviews];
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.isReviewPosting = false;
        toast.error('Ошибка отправки комментария');
      });
  }
});

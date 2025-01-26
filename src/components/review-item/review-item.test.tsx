import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../mock';

describe ('Component: Loading page',()=>{
  it('should render correct', () => {
    const reviewsItemTestId = 'reviews-item';
    const fakeReview = makeFakeReview();
    render(<ReviewItem review={fakeReview}/>);
    const reviewsItem = screen.getByTestId(reviewsItemTestId);
    expect(reviewsItem).toBeInTheDocument();
  });
});

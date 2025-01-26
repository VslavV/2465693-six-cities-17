import { render, screen } from '@testing-library/react';
import CityOffersEmpty from './city-offers-empty';

describe ('Component: city-offers-empty',()=>{
  it('should render correct', () => {
    const cityOffersEmptyContainerTestId = 'city-offer-empty';
    const cityName = 'Moscow';
    const expectedText = `We could not find any property available at the moment in ${cityName}`;
    render(<CityOffersEmpty cityName={cityName}/>);
    const cityOffersEmptyContainer = screen.getByTestId(cityOffersEmptyContainerTestId);
    expect(cityOffersEmptyContainer).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

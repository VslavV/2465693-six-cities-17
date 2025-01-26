import { render, screen } from '@testing-library/react';
import OfferHost from './offer-host';
import { makeFakeHost } from '../../mock';
import faker from 'faker';

describe ('Component: OfferHost',()=>{
  it('should render correct', () => {
    const offerHostContainerTestId = 'offer-host-container';
    const fakeHost = makeFakeHost();
    const fakeDescription = faker.datatype.string();
    render(<OfferHost host={fakeHost} description={fakeDescription} />);
    const offerHostContainer = screen.getByTestId(offerHostContainerTestId);
    expect(offerHostContainer).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import LoadingPage from './loading-page';

describe ('Component: Loading page',()=>{
  it('should render correct', () => {
    const loadingPageContainerTestId = 'loading-page-container';
    render(<LoadingPage />);
    const loadingPageContainer = screen.getByTestId(loadingPageContainerTestId);
    expect(loadingPageContainer).toBeInTheDocument();
  });
});

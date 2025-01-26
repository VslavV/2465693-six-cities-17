import { render, screen } from '@testing-library/react';
import FavoriteEmpty from './favorite-empty';

describe ('Component: favorite-empty',()=>{
  it('should render correct', () => {
    const favoriteEmptyContainerTestId = 'favorite-empty';
    render(<FavoriteEmpty />);
    const favoriteEmptyContainer = screen.getByTestId(favoriteEmptyContainerTestId);
    expect(favoriteEmptyContainer).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import GalleryItem from './gallery-item';

describe ('Component: GalleryItem',()=>{
  it('should render correct', () => {
    const galleryItemContainerTestId = 'gallery-item-container';
    const fakeSrc = 'img/studio-01.jpg';

    render(<GalleryItem src={fakeSrc}/>);
    const galleryItemContainer = screen.getByTestId(galleryItemContainerTestId);
    expect(galleryItemContainer).toBeInTheDocument();
  });
});


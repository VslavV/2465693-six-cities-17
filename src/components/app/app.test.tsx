import { render, screen } from '@testing-library/react';
import {MemoryHistory, createMemoryHistory} from 'history';
import { withHistory, withStore } from '../../mock-component';
import App from './app';
import { makeFakeStore, mockOffer, mockUserData} from '../../mock';
import { AuthorizationStatus, NameSpace, RoutePath } from '../../const';


describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('Oops! The page you are looking for does not exist.')).toBeInTheDocument();
    expect(screen.getByText('Click to return to the main page')).toBeInTheDocument();
  });

  it('should render "MainPage" when user is navigated to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(RoutePath.Index);

    render(withStoreComponent);

    expect(screen.getByText(/to stay in Paris/i)).toBeInTheDocument();
  });

  it('should render "FavoritesPage" if favorites is not empty when user is navigated to "/favorites"',() => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(RoutePath.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "OfferPage" with "ReviewsForm" if authorizationStatus is "auth"',() => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(RoutePath.Offer);
    render(withStoreComponent);

    expect(screen.getByText(`${mockUserData.email}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockOffer.description}`)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user is navigated to "/login"', () => {
    const fakeStore = makeFakeStore({
      [NameSpace.Auth]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      }});
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(RoutePath.Login);
    render(withStoreComponent);

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

});

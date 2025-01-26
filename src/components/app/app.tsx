import FavoritesPage from '../../pages/favorites-page/favorites-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import MainPage from '../../pages/main-page/main-page.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import LoadingPage from '../../pages/loading-page/loading-page.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { RoutePath, AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { selectAuthorizationStatus } from '../../store/auth/auth-selector.ts';
import { selectOffersLoading } from '../../store/offers/offers-selector.ts';
import { Route, Routes } from 'react-router-dom';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOffersLoading = useAppSelector(selectOffersLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={RoutePath.Index}>
          <Route index element={<MainPage />} />
          <Route path={RoutePath.Offer} element={<OfferPage/>} />
          <Route
            path={RoutePath.Favorites}
            element={
              <PrivateRoute redirectTo={RoutePath.Login} authStatus={AuthorizationStatus.Auth}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={RoutePath.Login}
            element={
              <PrivateRoute redirectTo={RoutePath.Index} authStatus={AuthorizationStatus.NoAuth}>
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route path={RoutePath.NotFound} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;

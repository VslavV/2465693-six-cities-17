import { MemoryHistory, createMemoryHistory } from 'history';
import { AuthorizationStatus, RoutePath } from '../../const';
import { withHistory } from '../../mock-component';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { render, screen } from '@testing-library/react';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });
  describe('PrivateRoute Favorites', () => {
    beforeEach(() => {
      mockHistory.push(RoutePath.Favorites);
    });

    it('should render component for public route (Login), when user not authorized', () => {
      const expectedText = 'public route';
      const notExpectedText = 'private route';
      const preparedComponent = withHistory(
        <Routes>
          <Route path={RoutePath.Favorites} element={<span>{expectedText}</span>} />
          <Route path={RoutePath.Login} element={
            <PrivateRoute redirectTo={RoutePath.Login} authStatus={AuthorizationStatus.NoAuth}>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
          />
        </Routes>,
        mockHistory
      );

      render(preparedComponent);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });
  });
  describe('PrivateRoute Login', () => {
    beforeEach(() => {
      mockHistory.push(RoutePath.Login);
    });
    it('should render component for public route (MainPage), when user authorized', () => {
      const expectedText = 'public route';
      const notExpectedText = 'private route';
      const preparedComponent = withHistory(
        <Routes>
          <Route path={RoutePath.Login} element={<span>{expectedText}</span>} />
          <Route path={RoutePath.Index} element={
            <PrivateRoute redirectTo={RoutePath.Index} authStatus={AuthorizationStatus.Auth}>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
          />
        </Routes>,
        mockHistory
      );

      render(preparedComponent);

      expect(screen.getByText(expectedText)).toBeInTheDocument();
      expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
    });
  });
});

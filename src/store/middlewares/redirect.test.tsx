import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { RoutePath } from '../../const';
import { AppState } from '../../types/state';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<AppState, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(RoutePath.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(RoutePath.Login);
  });

  it('should not redirect to "/lose" with empty action', () => {
    const emptyAction = { type: '', payload: RoutePath.Offer };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(RoutePath.Offer);
  });
});

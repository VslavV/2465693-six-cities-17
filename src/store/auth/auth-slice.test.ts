import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../mock';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { authSlice } from './auth-slice';

const state = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null
};
const mockUserData = makeFakeUserData();

describe ('Auth Slice', ()=>{
  it('should return initial state without parameters', () => {
    const result = authSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'});
    expect(result).toEqual(state);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userInfo if checkAuthAction is fulfilled', () => {
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserData,
      };

      const result = authSlice.reducer(state, {payload: mockUserData, type: checkAuthAction.fulfilled.type});
      expect(result).toEqual(expectedState);
    });

    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction is rejected', () => {
      const expectedState = {...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };
      const result = authSlice.reducer(state, {type: checkAuthAction.rejected.type});
      expect(result).toEqual(expectedState);
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and set userInfo if loginAction is fulfilled', () => {
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: mockUserData,
      };

      const result = authSlice.reducer(state, {payload: mockUserData, type: loginAction.fulfilled.type});
      expect(result).toEqual(expectedState);
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction is rejected', () => {
      const expectedState = {...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };
      const result = authSlice.reducer(state, {type: loginAction.rejected.type});
      expect(result).toEqual(expectedState);
    });
  });

  describe('loginAction test', () => {
    it('should authorizationStatus to "NO_AUTH" and reset userInfo if logoutAction is fulfilled',() => {
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: null,
      };
      const result = (authSlice.reducer(state, {type: logoutAction.fulfilled.type}));
      expect(result).toEqual(expectedState);
    });
  });
});



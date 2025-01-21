import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { AuthSlice } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { toast } from 'react-toastify';

const initialState: AuthSlice = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

export const authSlice = createSlice({
  name: NameSpace.Auth,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action)=> {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state)=> {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action)=> {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state)=> {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        toast.error('Ошибка аутентификации');
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
      });
  }
});

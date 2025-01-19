import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import rootReducer from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'common/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };

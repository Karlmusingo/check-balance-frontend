import { createSelector } from 'reselect';

const selector = (state: any) => state.login;

export const selectLogin = createSelector([selector], (state) => state);
export const isAuthSelector = createSelector(
  [selector],
  (state) => state.isAuth,
);

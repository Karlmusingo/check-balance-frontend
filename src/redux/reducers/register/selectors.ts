import { createSelector } from 'reselect';

const selector = (state: any) => state.register;

export const selectRegister = createSelector([selector], (state) => state);

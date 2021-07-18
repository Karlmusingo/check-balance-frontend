import { createSelector } from 'reselect';

const selector = (state: any) => state.transactions;

export const selectTransactions = createSelector(
  [selector],
  (state) => state.getTransactions,
);

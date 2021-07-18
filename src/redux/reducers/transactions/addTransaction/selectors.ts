import { createSelector } from 'reselect';

const selector = (state: any) => state.transactions;

export const selectNewTransaction = createSelector(
  [selector],
  (state) => state.addTransaction,
);

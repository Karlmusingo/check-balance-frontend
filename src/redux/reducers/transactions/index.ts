import { combineReducers } from 'redux';
import getTransactions from './getTransactions';
import addTransaction from './addTransaction';

const reducers = combineReducers({
  getTransactions,
  addTransaction,
});

export default reducers;

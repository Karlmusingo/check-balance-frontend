import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import transactions from './transactions';

const reducers = combineReducers({
  login,
  register,
  transactions,
});

export default reducers;

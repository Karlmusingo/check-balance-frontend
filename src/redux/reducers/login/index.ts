import * as types from './types';
import initialState from './initialState';

export default function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loginLoading: true,
        loginError: null,
      };
    case types.SET_ERROR:
      return {
        ...state,
        loginError: action.payload,
        loginLoading: false,
      };
    case types.SET_LOGIN:
      return {
        ...state,
        user: action.payload,
        loginError: null,
        loginLoading: false,
        isAuth: true,
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: action.payload ? true : false,
      };
    default:
      return state;
  }
}

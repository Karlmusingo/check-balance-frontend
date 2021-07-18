import * as types from './types';
import initialState from './initialState';

export default function reducer(
  state = initialState,
  action: ActionType,
): typeof initialState {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.SET_NEW_TRANSACTION:
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
}

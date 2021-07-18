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
        registerLoading: true,
        registerError: null,
      };
    case types.SET_ERROR:
      return {
        ...state,
        registerError: action.payload,
        registerLoading: false,
      };
    case types.SET_REGISTER:
      return {
        ...state,
        user: action.payload,
        registerError: null,
        registerLoading: false,
      };
    default:
      return state;
  }
}

import * as types from './types';
import initialState from './initialState';

interface IState {
  loading: boolean;
  error: any;
  data: any[];
  meta: {
    total: number;
    limit: number;
    page: number;
  };
}

export default function reducer(
  state = initialState,
  action: ActionType,
): IState {
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
    case types.SET_TRANSACTIONS:
      return {
        ...state,
        data: action.payload.data,
        meta: action.payload.meta,
        error: null,
        loading: false,
      };
    case types.ADD_NEW_TRANSACTION:
      return {
        ...state,
        data: [action.payload, ...state.data],
        error: null,
        loading: false,
      };
    default:
      return state;
  }
}

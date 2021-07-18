import http from 'src/helpers/http';
import * as types from './types';

export const setLoading = () => ({
  type: types.SET_LOADING,
});

export const setError = (payload: any) => ({
  type: types.SET_ERROR,
  payload,
});

export const setTransactions = (payload: any) => ({
  type: types.SET_TRANSACTIONS,
  payload,
});

export const addTransaction = (payload: any) => ({
  type: types.ADD_NEW_TRANSACTION,
  payload,
});

type Query = { limit?: number; page?: number };

export const getTransactions =
  (query?: Query) =>
  async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(setLoading());

      const { data } = await http.get(
        `/transactions?limit=${query?.limit || 10}&page=${query?.page || 1}`,
      );

      dispatch(setTransactions(data));
    } catch (err) {
      dispatch(
        setError(err?.data?.data || { message: 'something went wrong' }),
      );
    }
  };

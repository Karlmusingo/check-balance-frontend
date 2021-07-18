import http from 'src/helpers/http';

import * as types from './types';

export const setLoading = () => ({
  type: types.SET_LOADING,
});

export const setError = (payload: any) => ({
  type: types.SET_ERROR,
  payload,
});

export const setNewTransaction = (payload: any) => ({
  type: types.SET_NEW_TRANSACTION,
  payload,
});

export const addNewTransaction = (payload: any) => ({
  type: types.ADD_NEW_TRANSACTION,
  payload,
});

interface ITransaction {
  transactionType: string;
  amount: number;
  description: string;
}

export const addTransaction =
  (payload: ITransaction) =>
  (dispatch: DispatchType) =>
  async (onSuccess: any) => {
    try {
      dispatch(setLoading());

      const { data } = await http.post('/transactions', payload);

      dispatch(setNewTransaction(data));
      dispatch(addNewTransaction(data));
      onSuccess(data);
    } catch (err) {
      dispatch(
        setError(err?.data?.data || { message: 'something went wrong' }),
      );
    }
  };

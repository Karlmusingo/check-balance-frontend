import http from 'src/helpers/http';
import { currentUser } from '../login/actions';
import * as types from './types';

export const setLoading = () => ({
  type: types.SET_LOADING,
});

export const setError = (payload: any) => ({
  type: types.SET_ERROR,
  payload,
});

export const setRegister = (payload: any) => ({
  type: types.SET_REGISTER,
  payload,
});

export const register =
  (payload: any) => (dispatch: DispatchType) => async (onSuccess: any) => {
    try {
      dispatch(setLoading());

      const { data } = await http.post('/register', payload);

      localStorage.setItem('token', data?.token);
      localStorage.setItem('user', JSON.stringify(data));

      dispatch(setRegister(data));
      currentUser()(dispatch);

      onSuccess(data);

      return data;
    } catch (err) {
      dispatch(
        setError(err?.data?.data || { message: 'something went wrong' }),
      );
      return err;
    }
  };

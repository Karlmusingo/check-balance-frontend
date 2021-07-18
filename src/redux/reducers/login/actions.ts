import http from 'src/helpers/http';
import * as types from './types';

export const setLoading = () => ({
  type: types.SET_LOADING,
});

export const setError = (payload: any) => ({
  type: types.SET_ERROR,
  payload,
});

export const setLogin = (payload: any) => ({
  type: types.SET_LOGIN,
  payload,
});

export const setCurrentUser = (payload: any) => ({
  type: types.SET_CURRENT_USER,
  payload,
});

export const login =
  (payload: any) => (dispatch: DispatchType) => async (onSuccess: any) => {
    try {
      dispatch(setLoading());

      const { data } = await http.post('/login', payload);

      localStorage.setItem('token', data?.token);
      localStorage.setItem('user', JSON.stringify(data));

      dispatch(setLogin(data));
      onSuccess(data);

      return data;
    } catch (err) {
      dispatch(
        setError(err?.data?.data || { message: 'something went wrong' }),
      );
      return err;
    }
  };

export const currentUser = () => (dispatch: DispatchType) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    dispatch(setCurrentUser(JSON.parse(user)));
  } else {
    dispatch(setCurrentUser(null));
  }
};

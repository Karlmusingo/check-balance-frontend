import axios from 'axios';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

const requestHandler = (request: any) => {
  request.headers['authorization'] = `Bearer ${localStorage.getItem('token')}`;

  return request;
};

const errorHandler = (err: any) => {
  const { statusText } = err.response;
  const { message } = err.response.data;

  return Promise.reject({
    ...err,
    error: true,
    message: message || statusText,
    data: {
      ...err.response,
      message: message || statusText,
    },
  });
};

http.interceptors.request.use((request) => requestHandler(request));

http.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
);

export default http;

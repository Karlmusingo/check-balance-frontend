import * as types from "./types";

export const apiAction = ({
  url = "",
  method = "GET",
  data = null,
  queries = null,
  httpOptions = {},
  onStart = () =>
    async (dispatch: DispatchType): Promise<void> =>
      dispatch({ type: types.REQUEST_START, payload: { loading: true } }),
  onSuccess = () =>
    async (dispatch: DispatchType): Promise<void> =>
      dispatch({ type: types.REQUEST_SUCCESS, payload: { loading: false } }),
  onFailure = () =>
    async (dispatch: DispatchType): Promise<void> =>
      dispatch({ type: types.REQUEST_FAILURE, payload: { loading: false } }),
  onEnd = () =>
    async (dispatch: DispatchType): Promise<void> =>
      dispatch({ type: types.REQUEST_END, payload: { loading: false } }),
}: any): ActionType => {
  const urlQueries = queries || {};
  if (queries) {
    Object.keys(queries).forEach((key) => {
      urlQueries[key] =
        typeof urlQueries[key] === "string"
          ? urlQueries[key].trim()
          : urlQueries[key];
      return urlQueries[key] || delete urlQueries[key];
    });
  }

  return {
    type: types.REQUEST,
    payload: {
      url,
      method,
      httpOptions,
      data,
      queries: urlQueries,
      onStart,
      onSuccess,
      onFailure,
      onEnd,
    },
  };
};

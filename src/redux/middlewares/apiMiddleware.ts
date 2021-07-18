import { REQUEST } from '../common/types'

import http from '../../helpers/http'

type Action = { type: string; payload?: any }

type Dispatch = (action: Action) => void

const apiMiddleware =
  ({ dispatch, getState }: { dispatch: Dispatch; getState: () => unknown }) =>
  (next: Dispatch) =>
  async ({ type = '', payload = {} }: Action): Promise<void | unknown> => {
    if (type !== REQUEST) {
      return next({ type, payload })
    }
    try {
      if (typeof payload.onStart === 'function') {
        await payload.onStart()(dispatch)
      }
      // const { data } = await http[payload.method.toLowerCase()](
      //   payload.url,
      //   payload.data,
      // )
      const { data } = await http(payload.url, payload.data)

      if (typeof payload.onSuccess === 'function') {
        await payload.onSuccess(data)(dispatch)
      }
    } catch (error) {
      if (typeof payload.onFailure === 'function') {
        await payload.onFailure(error)(dispatch)
      }
    }
    if (typeof payload.onEnd === 'function') {
      await payload.onEnd()(dispatch)
    }
    return getState()
  }

export default apiMiddleware

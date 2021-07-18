import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'
import * as initialState from './initialState'
import apiMiddleware from './middlewares/apiMiddleware'

const middlewares = [thunk, apiMiddleware]
// const middlewares = [thunk]

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
)

export default store

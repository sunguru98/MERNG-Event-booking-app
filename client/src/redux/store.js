import rootReducer from './rootReducer'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga)
export default store

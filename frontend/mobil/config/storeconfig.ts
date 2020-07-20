import createSagaMiddleware from '@redux-saga/core'
import {appRootReducer} from '../store'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import {rootSaga} from '../saga'

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const deepRootReducer = combineReducers({app: appRootReducer})
  const store = createStore(deepRootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  return store
}

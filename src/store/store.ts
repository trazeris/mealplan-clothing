import { applyMiddleware, compose, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './route-saga';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middlewares = [sagaMiddleware];
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

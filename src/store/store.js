import { applyMiddleware, compose, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./route-saga";
// import thunk from "redux-thunk";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
 
const middlewares = [sagaMiddleware];
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
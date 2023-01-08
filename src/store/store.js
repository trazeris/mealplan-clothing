import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger];
const composedEnhancers = compose(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
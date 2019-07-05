import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import history from '../routes/history';

const middlewares = {
    thunk,
    routerMiddleware(history)
};


import rootReducer from "./ducks/reducers";

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: [],
    // blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(
    connectRouter(history)(persistedReducer),
    applyMiddleware(...middlewares)
);

const persistor = persistStore(store);

export default { store, persistor };
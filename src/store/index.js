import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';


import rootReducer from "../reducers";

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: [],
    // blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export default { store, persistor };
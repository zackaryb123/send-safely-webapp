import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from "./reducer";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(promise, thunk))
// );

// PERSIST //
const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(promise, thunk))
);

export default  () => {
    let store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(promise, thunk))
    );
    let persistor = persistStore(store);
    return {store, persistor}
}


// persistStore(store);

// export default store;
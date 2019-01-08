import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['likedJobs']
// }
//
// const persistedReducer = persistReducer(persistConfig, reducers)
//
// let store = createStore(
//   persistedReducer,
//   {},
//   compose(
//     applyMiddleware(thunk)
//   )
// );
//
// let persistor = persistStore(store);
//
// export default () => {
//   return { store, persistor };
// }

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk)
  )
);

export default store;

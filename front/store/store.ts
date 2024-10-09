import { combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Importer le reducer d'authentification
import { persistReducer } from 'redux-persist';
import storage from './storage'
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['auth'],
}

const rootReducer = combineReducers({
  auth: authReducer
})

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist specific actions that are non-serializable
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ],
      },
    }),
})

export const persistor = persistStore(store)

export const setupStore = () => {
  return store;
};

export const createPreloadedState = (
  customState: Partial<RootState>
) => {
  return {
    auth: { ...store.getState().auth, ...customState.auth },
  };
};
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
// Configuration du store de base avec un reducer vide pour l'instant
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },});


// // Exporter les types pour l'utilisation future
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// // Exporter le store pour l'utiliser dans le provider
// export default store;

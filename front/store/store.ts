import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Importer le reducer d'authentification
import userReducer from './userSlice'
import vehicleReducer from './vehicleSlice'
import { persistReducer } from 'redux-persist';
import storage from './storage'
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['auth', 'user', 'vehicle'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  vehicle: vehicleReducer
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
    user: { ...store.getState().user, ...customState.user },
    vehicle: { ...store.getState().vehicle, ...customState.vehicle }
  };
};
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;


import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Importer le reducer d'authentification

// Configuration du store de base avec un reducer vide pour l'instant
const store = configureStore({
  reducer: {
    auth: authReducer,
  },});

// Exporter les types pour l'utilisation future
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Exporter le store pour l'utiliser dans le provider
export default store;

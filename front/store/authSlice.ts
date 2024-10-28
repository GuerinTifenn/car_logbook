import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { AppDispatch } from '../store/store';

// Définir le type pour l'état d'authentification
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const savedToken = typeof window !== 'undefined' ? Cookies.get('token') : null;
// État initial
const initialState: AuthState = {
  token: savedToken ? savedToken : null,
  isAuthenticated: savedToken ? true : false,
};


// Créez le slice pour l'authentification
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Définir une action pour connecter l'utilisateur
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    // Définir une action pour déconnecter l'utilisateur
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
// Exporter les actions générées par createSlice
export const { setToken, clearToken } = authSlice.actions;

export const checkAuthStatus = () => (
  dispatch: AppDispatch
) => {
  const token = Cookies.get('token');
  if (!token) {
    dispatch(clearToken());
  } else {
    dispatch(setToken(token));
  }
};


// Exporter le reducer pour l'ajouter au store
export default authSlice.reducer;

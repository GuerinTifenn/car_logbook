import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Définir le type pour l'état d'authentification
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

// État initial
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
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

// Exporter le reducer pour l'ajouter au store
export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
  userId: string | null;
}

// État initial
const initialState: UserState = {
  userId: null
};

// Créez le slice pour l'authentification
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Définir une action pour connecter l'utilisateur
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});
// Exporter les actions générées par createSlice
export const { setUserId } = userSlice.actions;

// Exporter le reducer pour l'ajouter au store
export default userSlice.reducer;

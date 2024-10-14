import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
  userId: string ;
  userAdminStatus: boolean
}

// État initial
const initialState: UserState = {
  userId: '',
  userAdminStatus: false
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
	setUserAdminStatus(state, action: PayloadAction<boolean>) {
		state.userAdminStatus = action.payload;
	},
  },
});
// Exporter les actions générées par createSlice
export const { setUserId, setUserAdminStatus } = userSlice.actions;

// Exporter le reducer pour l'ajouter au store
export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface VehicleState {
  vehicleId: string ;
}

// État initial
const initialState: VehicleState = {
 vehicleId: '',
};

// Créez le slice pour l'authentification
const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    // Définir une action pour connecter l'utilisateur
    setVehicleId(state, action: PayloadAction<string>) {
      state.vehicleId = action.payload;
    },
	clearVehicle(state) {
		state.vehicleId = '';
	  },
  },
});
// Exporter les actions générées par createSlice
export const { setVehicleId, clearVehicle } = vehicleSlice.actions;

// Exporter le reducer pour l'ajouter au store
export default vehicleSlice.reducer;

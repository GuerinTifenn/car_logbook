export type VehiclePayLoad = {
	carBrand: string;
	model: string;
	firstRegistrationDate: string;
	registration: string;
	vin: string;
	userId: string | null;
	// fileName: string; // Ajout du nom de fichier (si disponible)
  };

export type Vehicle = {
	carBrand: string;
	model: string;
	firstRegistrationDate: string;
	registration: string;
	vin: string;
	userId: string;
	// fileName:
};

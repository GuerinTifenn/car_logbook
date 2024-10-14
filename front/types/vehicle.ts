export type VehiclePayLoad = {
	carBrand: string;
	model: string;
	firstRegistrationDate: string;
	registration: string;
	vin: string;
	userId: string | null;
	// fileName: string; // Ajout du nom de fichier (si disponible)
  };

export type Vehicles = {
	_id: string,
	carBrand: string;
	model: string;
	firstRegistrationDate: string;
	registration: string;
	vin: string;
	userId: string;
	vehicleId: string
	// fileName:
};

export type Vehicle = {
	carBrand: string;
	model: string;
	firstRegistrationDate: string;
	registration: string;
	vin: string;
	userId: string;
	vehicleId: string
	// fileName:
};

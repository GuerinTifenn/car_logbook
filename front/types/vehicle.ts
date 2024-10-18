export type VehiclePayLoad = {
	carBrand: string;
	model: string;
	firstRegistrationDate: string;
	registration: string;
	vin: string;
	userId: string | null;
	fileName: string;
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
	// fileName: string
};

export type Vehicle = {
	carBrand: string;
	model: string;
	firstRegistrationDate: string;
	registration: string;
	vin: string;
	userId: string;
	vehicleId: string
	fileName: string
};

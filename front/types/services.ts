export type ServicePayLoad = {
	interventionDate: string;
	description: string;
	kilometers: number;
	price: number;
	vehicleId: string | null;
	// fileName: string; // Ajout du nom de fichier (si disponible)
  };

export type Services = {
	_id: string,
	interventionDate: string;
	description: string;
	kilometers: number;
	price: number;
	vehicleId: string;
	fileName: string;
	status: string
};

export type Service = {
	interventionDate: string;
	description: string;
	kilometers: number;
	price: number;
};

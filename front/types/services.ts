export type ServicePayLoad = {
	interventionDate: string;
	description: string;
	kilometers: number | undefined;
	price: number | undefined;
	vehicleId: string | null;
	// fileName: string; // Ajout du nom de fichier (si disponible)
  };

export type Services = {
	interventionDate: string;
	description: string;
	kilometers: number;
	price: number;
	vehicleId: string;
	// fileName:
};

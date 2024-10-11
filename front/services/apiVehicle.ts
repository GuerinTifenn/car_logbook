import { type VehiclePayLoad, type Vehicles, type Vehicle } from "../types/vehicle";

const apiUrl = "http://localhost:3000/api";

  export const registerVehicles = async (vehicleData: VehiclePayLoad): Promise<Vehicle> => {
	const response = await fetch(`${apiUrl}/vehicle/create`,
		{
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			credentials: 'include',
			body: JSON.stringify(vehicleData),
		  }
		);

	if (!response.ok) {
	  throw new Error("Failed to register vehicles");
	}
	return response.json();
  };

  export const fetchUserVehicles = async (userId: string): Promise<Vehicles[]> => {
	const response = await fetch(`${apiUrl}/vehicles/${userId}`, {
		method: "GET",
		headers: {
		  "Content-Type": "application/json",
		},
		credentials: 'include',
	  });

	if (!response.ok) {
	  throw new Error("Failed to fetch vehicles");
	}
	return response.json();
  };

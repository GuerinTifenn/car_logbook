import { type Services } from "../types/services";

const apiUrl = "http://localhost:3000/api";

  export const registerServices = async (vehicleId: string, formData: FormData): Promise<Services[]> => {
	const response = await fetch(`${apiUrl}/service/${vehicleId}`,
		{
			method: "POST",
			credentials: 'include',
			body: formData,
		  }
		);

	if (!response.ok) {
		const errorData = await response.json(); // Extract the error response
		throw new Error(errorData.code || 'UNKNOWN_ERROR'); // Throw error with the code or 'UNKNOWN_ERROR'
	}
	return response.json();
  };

  export const fetchVehicleServices = async (vehicleId: string): Promise<Services[]> => {
	const response = await fetch(`${apiUrl}/services/${vehicleId}`, {
		method: "GET",
		headers: {
		  "Content-Type": "application/json",
		},
		credentials: 'include',
	  });

	if (!response.ok) {
	  throw new Error("Failed to fetch services");
	}
	return response.json();
  };

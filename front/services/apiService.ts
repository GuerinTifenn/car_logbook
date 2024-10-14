import { type ServicePayLoad, type Services } from "../types/services";

const apiUrl = "http://localhost:3000/api";

  export const registerServices = async (vehicleId: string, serviceData: ServicePayLoad): Promise<Services[]> => {
	const response = await fetch(`${apiUrl}/service/${vehicleId}`,
		{
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			credentials: 'include',
			body: JSON.stringify(serviceData),
		  }
		);

	if (!response.ok) {
	  throw new Error("Failed to register vehicles");
	}
	return response.json();
  };

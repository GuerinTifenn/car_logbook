import { type VehiclePayLoad, type Vehicle } from "../types/vehicle";

const apiUrl = "http://localhost:3000/api";

  export const registerVehicles = async (vehicleData: VehiclePayLoad): Promise<Vehicle[]> => {
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

//   export const fetchVehicle = async (vehicleData: FormData): Promise<Vehicle> => {
// 	const response = await fetch(apiUrl, {
// 	  method: "GET",
// 	  body: vehicleData,
// 	});

// 	if (!response.ok) {
// 	  throw new Error("Failed to register vehicle");
// 	}
// 	return response.json();
//   };

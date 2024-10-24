import { type Services, type Service } from "../types/services";

const apiUrl = "http://localhost:3000/api";

// Enregistrer un nouveau service
export const registerServices = async (vehicleId: string, formData: FormData): Promise<Services[]> => {
  const response = await fetch(`${apiUrl}/service/${vehicleId}`, {
    method: "POST",
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code || 'UNKNOWN_ERROR');
  }
  return response.json();
};

// Récupérer tous les services pour un véhicule
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

// Récupérer un seul service par son ID (serviceId)
export const fetchServiceById = async (serviceId: string): Promise<Service> => {
  const response = await fetch(`${apiUrl}/service/${serviceId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch the service");
  }
  return response.json(); // Ici, on retourne un seul objet de type 'Services'
};

// Demande edition service  (!! POST REQUEST BECAUSE SHOULD BE VALIDATED BY ADMIN)
export const askUpdateService = async (formData: FormData): Promise<Services> => {
  const response = await fetch(`${apiUrl}/service/edit/request`, {
    method: "POST",
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code || 'UNKNOWN_ERROR');
  }
  return response.json();
};

// // Supprimer un service par son ID
// export const deleteService = async (serviceId: string): Promise<void> => {
//   const response = await fetch(`${apiUrl}/service/delete/${serviceId}`, {
//     method: "DELETE",
//     credentials: 'include',
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.code || 'UNKNOWN_ERROR');
//   }
// };

// Fonction pour récupérer toutes les requêtes admin (edit and delete)
export const fetchAllRequests = async (): Promise<any[]> => {
  const response = await fetch(`${apiUrl}/admin/requests`, {
    method: "GET",
	headers: {
		"Content-Type": "application/json",
	  },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch edit/delete requests");
  }
  return response.json();
};

// // Fonction pour mettre à jour le statut d'une requête
// export const updateRequestStatus = async (
//   requestId: string,
//   status: "accepted" | "declined"
// ): Promise<void> => {
//   const response = await fetch(`${apiUrl}/edit-requests/${requestId}`, {
//     method: "PATCH", // PATCH pour mise à jour partielle
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify({ status }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to update request status");
//   }
// };

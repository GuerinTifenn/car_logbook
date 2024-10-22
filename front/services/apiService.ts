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

// Mettre à jour un service existant
export const updateService = async (serviceId: string, formData: FormData): Promise<Services> => {
  const response = await fetch(`${apiUrl}/service/${serviceId}`, {
    method: "PUT",
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code || 'UNKNOWN_ERROR');
  }
  return response.json();
};

// Supprimer un service par son ID
export const deleteService = async (serviceId: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/service/${serviceId}`, {
    method: "DELETE",
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.code || 'UNKNOWN_ERROR');
  }
};


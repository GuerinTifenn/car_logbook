

const apiUrl = "http://localhost:3000/api";

// // Fonction pour mettre à jour le statut d'une requête
export const processEditRequest = async ( requestId: string, action: "accept" | "decline" ): Promise<void> => {
  const response = await fetch(`${apiUrl}/admin/requests/edit/process/${requestId}/${action}`, {
    method: "PATCH", // PATCH pour mise à jour partielle
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update request status");
  }
  return response.json();
};

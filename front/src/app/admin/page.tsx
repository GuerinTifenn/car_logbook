"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Utilisé pour afficher des images
import { fetchAllRequests } from "../../../services/apiService"; // Import des fonctions API

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState<any[]>([]); // Liste des requêtes
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all the requests on page load
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchAllRequests();
        setRequests(data);
      } catch (error) {
        console.error("Failed to fetch requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

//   // Gérer l'acceptation d'une requête
//   const handleAccept = async (requestId: string) => {
//     try {
//       await updateRequestStatus(requestId, "accepted"); // Appel API pour accepter la requête
//       alert("Request accepted!");
//       setRequests((prev) =>
//         prev.filter((request) => request._id !== requestId) // Filtre les requêtes une fois acceptées
//       );
//     } catch (error) {
//       console.error("Failed to accept request", error);
//       alert("Failed to accept the request. Please try again.");
//     }
//   };

//   // Gérer le refus d'une requête
//   const handleDecline = async (requestId: string) => {
//     try {
//       await updateRequestStatus(requestId, "declined"); // Appel API pour refuser la requête
//       alert("Request declined!");
//       setRequests((prev) =>
//         prev.filter((request) => request._id !== requestId) // Filtre les requêtes une fois refusées
//       );
//     } catch (error) {
//       console.error("Failed to decline request", error);
//       alert("Failed to decline the request. Please try again.");
//     }
//   };

  return (
    <section className="admin-requests-section">
      <h1 className="text-center text-4xl mb-6">Request</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length > 0 ? (
        requests.map((request) => (
          <div
            key={request._id}
            className="border p-4 rounded-lg shadow-md mb-5 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500">
                <span className="mr-2">📅</span>
                {new Date(request.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <h2 className="text-xl font-bold">{request.heading}</h2>
              <p>{request.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <Image src="/assets/placeholder-image.png" alt="Request Image" width={60} height={60} />
              {/* <div className="flex gap-3">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleAccept(request._id)}
                >
                  ✔ Accept
                </button>
                <button
                  className="border border-gray-300 px-4 py-2 rounded"
                  onClick={() => handleDecline(request._id)}
                >
                  ✖ Decline
                </button>
              </div> */}
            </div>
          </div>
        ))
      ) : (
        <p>No requests found.</p>
      )}
    </section>
  );
};

export default AdminRequestsPage;

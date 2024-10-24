"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAllRequests } from "../../../services/apiService";
import calendarIcon from "../../public/assets/calendar.svg";
import { formatDate } from "@/utils/date";
import pencilIcon from "../../public/assets/pencil-edit.svg";
import trashBinIcon from "../../public/assets/trash-bin.svg";
import arrowRightIcon from "../../public/assets/arrow-right.svg";

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequestsAndServices = async () => {
      try {
        const fetchedRequests = await fetchAllRequests();
        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Failed to fetch requests or services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestsAndServices();
  }, []);

  const filteredRequests = requests.filter((request) =>
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderWithArrowIcon = (current: any, requested: any, formatFn?: (val: any) => any) => {
    const formattedCurrent = current ? (formatFn ? formatFn(current) : current) : "N/A";
    const formattedRequested = requested ? (formatFn ? formatFn(requested) : requested) : "N/A";

    return (
      <span>
        {formattedCurrent}{" "}
        {formattedCurrent !== formattedRequested && (
          <>
            <Image src={arrowRightIcon} alt="arrow" width={16} className="inline-block mx-2" />
            {formattedRequested}
          </>
        )}
      </span>
    );
  };

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
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-8">Requests</h1>
      <div className="flex justify-center">
        <div className="w-full xl:w-6/12">
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="🔍 Search by description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg p-2 w-full max-w-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading requests...</div>
      ) : (
        <div className="flex flex-col items-center mb-12 gap-8">
          {filteredRequests.length === 0 ? (
            <div className="text-center text-gray-500">No requests found</div>
          ) : (
            filteredRequests.map((request) => {
              const currentService = request.service; // Récupérer les données actuelles directement à partir de la requête

              return (
                <div key={request._id} className="w-full xl:w-6/12">
                  <ul className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full">
                    <li>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Image src={calendarIcon} alt="date" width={24}></Image>
                          <span>{formatDate(request.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {request.type === "edit" ? (
                            <Image src={pencilIcon} alt="edit request" width={24} />
                          ) : (
                            <Image src={trashBinIcon} alt="delete request" width={24} />
                          )}
                        </div>
                      </div>
                      <hr className="border my-3 border-grey" />

                      <div className="flex flex-col gap-2 text-left">
                        <div>
                          <strong>Date:</strong>{" "}
                          {renderWithArrowIcon(
                            currentService?.interventionDate,
                            request.interventionDate,
                            formatDate
                          )}
                        </div>
                        <div>
                          <strong>Description:</strong>{" "}
                          {renderWithArrowIcon(
                            currentService?.description,
                            request.description
                          )}
                        </div>
                        <div>
                          <strong>Kilometers:</strong>{" "}
                          {renderWithArrowIcon(
                            currentService?.kilometers,
                            request.kilometers
                          )}
                        </div>
                        {request.price !== undefined && request.price !== null && (
                          <div>
                            <strong>Price:</strong>{" "}
                            {renderWithArrowIcon(
                              currentService?.price,
                              request.price,
                              (val) => (val ? `${val} €` : "N/A")
                            )}
                          </div>
                        )}
                        <div>
                          <strong>Comment:</strong> {request.comment || "N/A"}
                        </div>
                      </div>

                      {/* Boutons accept/refuse */}
                      <div className="flex justify-center gap-3 mt-4">
                        <button
                          className="border border-gray-300 px-4 py-2 rounded hover:bg-grey"
                          // onClick={() => handleDecline(request._id)}
                        >
                          ✖ Decline
                        </button>
                        <button
                          className="bg-blue hover:bg-bluedark text-white px-4 py-2 rounded"
                          // onClick={() => handleAccept(request._id)}
                        >
                          ✔ Accept
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
};

export default AdminRequestsPage;

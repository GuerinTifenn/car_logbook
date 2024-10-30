"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchAllRequests } from "../../../services/apiService";
import calendarIcon from "../../public/assets/calendar.svg";
import { formatDate } from "@/utils/date";
import pencilIcon from "../../public/assets/pencil-edit.svg";
import trashBinIcon from "../../public/assets/trash-bin.svg";
import arrowRightIcon from "../../public/assets/arrow-right.svg";
import {
  processEditRequest,
  processDeleteRequest,
} from "../../../services/apiRequest";
import { type Requests } from "../../../types/request";

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const renderWithArrowIcon = (
    current: string | number,
    requested: string | number,
    formatFn?: (val: string) => string
  ) => {
    const formattedCurrent = current
      ? formatFn
        ? formatFn(String(current))
        : current
      : "N/A";
    const formattedRequested = requested
      ? formatFn
        ? formatFn(String(requested))
        : requested
      : "N/A";

    return (
      <span>
        {formattedCurrent}{" "}
        {formattedCurrent !== formattedRequested && (
          <>
            <Image
              src={arrowRightIcon}
              alt="arrow"
              width={16}
              className="inline-block mx-2"
            />
            {formattedRequested}
          </>
        )}
      </span>
    );
  };

  const handleViewInvoice = (fileUrl: string) => {
    // Open the file file in a new tab
    window.open(fileUrl, "_blank"); // Opens in a new tab
  };

  //   // Gérer l'acceptation d'une requête
  const handleAccept = async (requestId: string, requestType: string) => {
    try {
      if (requestType === "edit") {
        await processEditRequest(requestId, "accept"); // Appel API pour accepter la requête
      } else {
        await processDeleteRequest(requestId, "accept"); // Appel API pour accepter la requête
      }
      alert("Request accepted!");
      setRequests(
        (prev) => prev.filter((request) => request._id !== requestId) // Filtre les requêtes une fois acceptées
      );
    } catch (error) {
      console.error("Failed to accept request", error);
      alert("Failed to accept the request. Please try again.");
    }
  };

  //   // Gérer le refus d'une requête
  const handleDecline = async (requestId: string, requestType: string) => {
    try {
      if (requestType === "edit") {
        await processEditRequest(requestId, "decline"); // Appel API pour accepter la requête
      } else {
        await processDeleteRequest(requestId, "decline"); // Appel API pour accepter la requête
      }
      alert("Request declined!");
      setRequests(
        (prev) => prev.filter((request) => request._id !== requestId) // Filtre les requêtes une fois refusées
      );
    } catch (error) {
      console.error("Failed to decline request", error);
      alert("Failed to decline the request. Please try again.");
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-8">Requests</h1>

      {loading ? (
        <div className="text-center">Loading requests...</div>
      ) : (
        <div className="flex flex-col items-center mb-12 gap-8">
          {requests.length === 0 ? (
            <div className="text-center text-gray-500">No requests found</div>
          ) : (
            requests.map((request) => {
              const currentService = request.service; // Récupérer les données actuelles directement à partir de la requête

              return (
                <div key={request._id} className="w-full xl:w-6/12">
                  <ul className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full">
                    <li>
                      <div className="flex justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={calendarIcon}
                            alt="date"
                            width={24}
                          ></Image>
                          <span>{formatDate(request.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {request.type === "edit" ? (
                            <Image
                              src={pencilIcon}
                              alt="edit request"
                              width={24}
                            />
                          ) : (
                            <Image
                              src={trashBinIcon}
                              alt="delete request"
                              width={24}
                            />
                          )}
                        </div>
                      </div>
                      <hr className="border my-3 border-grey" />

                      <div className="flex justify-between">
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
                          {request.price !== undefined &&
                            request.price !== null && (
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
                        <div className="card-footer">
                          <button
                            className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors"
                            onClick={() => handleViewInvoice(request.fileName)}
                          >
                            View Invoice
                          </button>
                        </div>
                      </div>

                      {/* Boutons accept/refuse */}
                      <div className="flex justify-center gap-3 mt-4">
                        <button
                          className="border border-gray-300 px-4 py-2 rounded hover:bg-grey"
                          onClick={() =>
                            handleDecline(request._id, request.type)
                          }
                        >
                          ✖ Decline
                        </button>
                        <button
                          className="bg-blue hover:bg-bluedark text-white px-4 py-2 rounded"
                          onClick={() =>
                            handleAccept(request._id, request.type)
                          }
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

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchVehicleServices } from "../../../services/apiService";
import { Services } from "../../../types/services";
import { useSearchParams } from "next/navigation";

const ServicesPage: React.FC = () => {
  const router = useRouter();
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const vehicleId: string = searchParams.get("vehicleId") || "";

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const fetchedServices = await fetchVehicleServices(vehicleId);
        setServices(fetchedServices);
      } catch (error) {
        console.error("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllServices();
  }, [vehicleId]);

  const goToAddServices = (vehicleID: string) => {
    router.push(`/add-service?vehicleId=${vehicleID}`);
  };

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-8">Interventions</h1>

      {loading ? (
        // Affichage de l'état de chargement
        <div className="text-center">Loading...</div>
      ) : (
        // Si le chargement est terminé
        <div className="flex flex-col items-center mb-12 gap-8">
          {/* Vérifiez si le tableau services est vide */}
          {services.length === 0 ? (
            <div className="text-center text-gray-500">
              No interventions added yet
            </div>
          ) : (
            // Afficher les cartes de service si elles existent
            services.map((service) => (
              <div key={service._id} className="w-full xl:w-6/12">
                <ul className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full">
                  <li>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-semibold mb-4">
                        {service.description}
                      </h2>
                      <p className="text-lg mb-2">{service.interventionDate}</p>
                      <p className="text-lg mb-2">{service.kilometers}</p>
                      <p className="text-lg mb-4">{service.price}</p>
                    </div>
                    <div className="card-footer mt-auto">
                      <button className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors">
                        View Invoice
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            ))
          )}
        </div>
      )}

      <div className="flex justify-center">
        <button
          className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors"
          onClick={() => goToAddServices(vehicleId)}
        >
          Add Service
        </button>
      </div>
    </section>
  );
};

export default ServicesPage;

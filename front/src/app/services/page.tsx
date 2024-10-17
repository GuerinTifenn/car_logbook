"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchVehicleServices } from "../../../services/apiService";
import { fetchVehicleById } from "../../../services/apiVehicle";
import { Services } from "../../../types/services";
import { Vehicle } from "../../../types/vehicle";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import pencilIcon from "../../public/assets/pencil-edit.svg";
import trashBinIcon from "../../public/assets/trash-bin.svg";
import { formatDate } from "@/utils/date";

const ServicesPage: React.FC = () => {
  const router = useRouter();
  const [services, setServices] = useState<Services[]>([]);
  const [vehicle, setVehicleInfos] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const vehicleId: string = searchParams.get("vehicleId") || "";
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    if (vehicleId) {
      const fetchVehicleInfos = async () => {
        try {
          const vehicleInfos = await fetchVehicleById(vehicleId);
          setVehicleInfos(vehicleInfos);
        } catch (error) {
          console.error("Failed to load services. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchVehicleInfos();
    }
  }, [vehicleId]);

  const goToAddServices = (vehicleID: string) => {
    router.push(`/add-service?vehicleId=${vehicleID}`);
  };

  const editService = (serviceID: string) => {
    console.log("go to edit page", serviceID);
  };

  const deleteService = (serviceID: string) => {
    console.log("open delete modal", serviceID);
  };

  const filteredServices = services.filter((service) =>
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-8">Interventions</h1>
      <div className="flex justify-center">
        <div className="w-full xl:w-6/12">
          {vehicle ? (
            <h2 className="text-1xl font-bold">
              {vehicle.carBrand} {vehicle.model}
            </h2>
          ) : (
            <div></div>
          )}
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
            filteredServices.map((service) => (
              <div key={service._id} className="w-full xl:w-6/12">
                <ul className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full">
                  <li>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        {/* TODO : Update with calendar icon */}
                        <Image src={pencilIcon} alt="edit" width={24}></Image>
                        <span className="">
                          {formatDate(service.interventionDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => editService(service._id)}>
                          <Image src={pencilIcon} alt="edit" width={24}></Image>
                        </button>
                        <button onClick={() => deleteService(service._id)}>
                          <Image
                            src={trashBinIcon}
                            alt="delete"
                            width={24}
                          ></Image>
                        </button>
                      </div>
                    </div>
                    <hr className="border my-3 border-grey" />
                    <div className="">
                      <h2 className="text-2xl font-semibold mb-4 truncate text-start">
                        {service.description}
                      </h2>
                      <div className="flex justify-between mx-3.5">
                        <div className="text-left">
                          <p className="text-lg mb-2">
                            {service.kilometers} Km
                          </p>
                          <p className="text-lg mb-4">{service.price} €</p>
                        </div>
                        <div>
                          {/* <Image
                            src={trashBinIcon}
                            alt="delete"
                            width={24}
                          ></Image> */}
                        </div>
                      </div>
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

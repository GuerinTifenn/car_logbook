"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserVehicles } from "../../../services/apiVehicle";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Vehicles } from "../../../types/vehicle";
import { formatDateFR } from "@/utils/date";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicles[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    if (!userId) {
      router.replace("/login");
      return;
    }

    const fetchAllVehicles = async () => {
      try {
        const fetchedVehicles = await fetchUserVehicles(userId);
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error("Failed to load vehicles. Please try again later."); // Log the error
      } finally {
        setLoading(false);
      }
    };
    fetchAllVehicles();
  }, [userId]);

  const goToServices = (vehicleID: string) => {
    router.push(`/services?vehicleId=${vehicleID}`);
  };

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to your AutoLog Dashboard
      </h1>

      {loading ? (
        // Affichage de l'état de chargement
        <div className="text-center">Loading...</div>
      ) : (
        // Si le chargement est terminé
        <div className="grid md:grid-cols-grid-auto-fit gap-8 justify-center">
          {/* Afficher les cartes de véhicules si elles existent */}
          {vehicles.length > 0 &&
            vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full"
              >
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold mb-4 truncate">
                    {vehicle.carBrand} {vehicle.model}
                  </h2>
                  <hr className="border my-3 border-grey" />
                  <span className="text-lg mb-2">
                    {formatDateFR(vehicle.firstRegistrationDate)}
                  </span>
                  {/* <p className="text-lg mb-2">
                    First Registration Date: {vehicle.firstRegistrationDate}
                  </p> */}
                  <p className="text-lg mb-2">
                    Registration: {vehicle.registration}
                  </p>
                  <p className="text-lg mb-4">VIN: {vehicle.vin}</p>
                  {/* {vehicle.fileName && (
                    <p className="text-sm italic text-gray-500 mb-4">Uploaded File: {vehicle.fileName}</p> */}
                  {/* )} */}
                </div>
                <div className="card-footer mt-auto">
                  <button
                    className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors"
                    onClick={() => goToServices(vehicle._id)}
                  >
                    View Services
                  </button>
                </div>
              </div>
            ))}

          {/* Afficher la carte pour ajouter un nouveau véhicule */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full">
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-4">Add a new car</h2>
              <hr className="border my-3 border-grey" />
              <p className="text-lg mb-4">
                Get started by registering your vehicle to keep all your
                maintenance records in one place.
              </p>
            </div>
            <div className="card-footer mt-auto">
              <button
                className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors"
                onClick={() => router.push("/register-car")}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;

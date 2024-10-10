"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import carImage from "../../public/assets/car.jpeg";

interface Vehicle {
  id: string;
  carBrand: string;
  model: string;
  firstRegistrationDate: string;
  registration: string;
  vin: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const fetchedVehicles = await response.json();
        setVehicles(fetchedVehicles);
      } catch (error) {
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-8">Welcome to your AutoLog Dashboard</h1>

      {/* Affichage de l'état de chargement */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        // Grille de contenu principale
        <div className={`grid gap-6 ${vehicles.length > 0 ? "lg:grid-cols-3" : "flex justify-center"}`}>
          {/* Cartes des véhicules */}
          {vehicles.length > 0 &&
            vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full"
              >
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold mb-4">
                    {vehicle.carBrand} {vehicle.model}
                  </h2>
                  <p className="text-lg mb-2">First Registration Date: {vehicle.firstRegistrationDate}</p>
                  <p className="text-lg mb-2">Registration: {vehicle.registration}</p>
                  <p className="text-lg mb-4">VIN: {vehicle.vin}</p>
                </div>
                <div className="card-footer mt-auto">
                  <button
                    className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors"
                    onClick={() => router.push(`/vehicle/${vehicle.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

          {/* Carte pour ajouter un nouveau véhicule */}
          <div
            className={`border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between h-full ${
              vehicles.length === 0 ? "max-w-md" : ""
            }`}
          >
            <div className="flex-grow">
              <Image
                src={carImage}
                alt="Add a new car"
                className="w-full h-32 object-cover rounded-lg mb-4"
                priority
              />
              <h2 className="text-2xl font-semibold mb-4">Add a new car</h2>
              <p className="text-lg mb-4">
                Get started by registering your vehicle to keep all your maintenance records in one place.
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

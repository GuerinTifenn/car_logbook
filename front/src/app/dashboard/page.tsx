"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import carImage from "../../public/assets/car.jpeg";
import serviceImage from "../../public/assets/service.jpeg";
import historyImage from "../../public/assets/history.jpeg";

const Dashboard: React.FC = () => {
  const router = useRouter();

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold text-center my-8">
        Welcome to your AutoLog Dashboard
      </h1>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Carte 1 : Register your car */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between">
          <div>
            <Image
              src={carImage}
              alt="Register your car"
              className="w-full h-32 object-cover rounded-lg mb-4"
              priority
            />
            <h2 className="text-2xl font-semibold mb-4">Register your car</h2>
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

        {/* Carte 2 : Add a new service */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between">
          <div>
            <Image
              src={serviceImage}
              alt="Add a new service"
              className="w-full h-32 object-cover rounded-lg mb-4"
              priority
            />
            <h2 className="text-2xl font-semibold mb-4">Add a new service</h2>
            <p className="text-lg mb-4">
              Easily log every maintenance and repair to ensure your car is always in top shape.
            </p>
          </div>
          <div className="card-footer mt-auto">
            <button
              className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors"
              onClick={() => router.push("/add-service")}
            >
              Start
            </button>
          </div>
        </div>

        {/* Carte 3 : View full history */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-lg text-center hover:shadow-2xl transition-shadow duration-200 flex flex-col justify-between">
          <div>
            <Image
              src={historyImage}
              alt="View full history"
              className="w-full h-32 object-cover rounded-lg mb-4"
              priority
            />
            <h2 className="text-2xl font-semibold mb-4">View full history</h2>
            <p className="text-lg mb-4">
              Access the complete service history of your vehicle with just one click.
            </p>
          </div>
          <div className="card-footer mt-auto">
            <button
              className="bg-blue text-white rounded px-4 py-2 hover:bg-bluedark transition-colors"
              onClick={() => router.push("/view-history")}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

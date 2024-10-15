"use client";
import React, { useState } from "react";
import Image from "next/image";
import addService from "../../public/assets/addservice.jpg";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { registerServices } from "../../../services/apiService";

const AddService: React.FC = () => {
  const [interventionDate, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [kilometers, setKilometers] = useState<number | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const vehicleId: string = searchParams.get("vehicleId") || "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      interventionDate,
      description,
      kilometers,
      price,
      vehicleId,
    };

    try {
      await registerServices(vehicleId, formData);
      alert("The intervention has been successfully registered!");
      router.push(`/services?vehicleId=${vehicleId}`);
    } catch (error) {
      console.error("Failed to register the intervention", error);
      alert("Failed to register the intervention. Please try again.");
    }
  };

  const isFormValid = (): boolean => {
    return (
      interventionDate.length > 1 &&
      description.length > 1 &&
      kilometers !== undefined &&
      kilometers > 0
      // file !== null
    );
  };

  return (
    <section>
      <div className="m-2 xl:m-5 flex flex-col xl:flex-row gap-5">
        <div className="w-full xl:w-6/12 gap-5 flex flex-col">
          <h1 className="text-4xl text-center my-5">Add an intervention</h1>
          <form>
            <fieldset className="xl:m-12 flex flex-col gap-5">
              {/* Ligne 1 : Date */}
              <div className="relative flex flex-col gap-1.5 w-full">
                <label htmlFor="date">Date</label>
                <input
                  className={`border border-1 px-2 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue ${
                    !interventionDate ? "text-gray-400" : "text-black"
                  }`}
                  type="date"
                  name="InterventionDate"
                  value={interventionDate}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              {/* Ligne 2 : Description */}
              <div className="flex flex-col gap-1.5 w-full">
                <label htmlFor="description">Description</label>
                <input
                  className="border border-1 px-2 py-2.5"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter the Description"
                />
              </div>

              {/* Ligne 3 : Kilometers */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="kilometers">Kilometers</label>
                <input
                  className="border border-1 px-2 py-2.5 w-full"
                  type="number"
                  name="kilometers"
                  value={kilometers}
                  onChange={(e) => setKilometers(Number(e.target.value))}
                  placeholder="Enter kilometers"
                />
              </div>

              {/* Ligne 4 : Price */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="price">Price</label>
                <input
                  className="border border-1 px-2 py-2.5 w-full"
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Enter price"
                />
              </div>

              {/* Ligne 5 : Upload File */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="file">Upload file</label>
                <div className="flex items-center gap-2">
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <input
                    type="text"
                    value={file?.name || "No file chosen"}
                    readOnly
                    className={`border border-gray-300 px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue ${
                      file ? "text-black" : "text-gray-400"
                    }`}
                    placeholder="No file selected"
                  />
                  <label
                    htmlFor="file"
                    className="bg-blue text-white px-4 py-2 cursor-pointer hover:bg-bluedark transition"
                  >
                    Browse
                  </label>
                </div>
              </div>

              {/* Bouton Submit */}
              <div className="mt-3">
                <button
                  className={`${
                    isFormValid()
                      ? "bg-blue hover:bg-bluedark"
                      : "bg-gray-300 cursor-not-allowed"
                  } px-2 py-2.5 w-full text-white`}
                  type="submit"
                  disabled={!isFormValid()}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="w-full lg:w-6/12 max-w-[50vw] mx-auto xl:mx-0">
          <Image
            src={addService}
            alt="add service image"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AddService;

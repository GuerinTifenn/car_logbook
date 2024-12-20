"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerVehicles } from "../../../services/apiVehicle";
import immatImage from "../../public/assets/immatriculation.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const RegisterCar: React.FC = () => {
  const [carBrand, setCarBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [firstRegistrationDate, setFirstRegistrationDate] =
    useState<string>("");
  const [registration, setRegistration] = useState<string>("");
  const [vin, setVin] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const userId = useSelector((state: RootState) => state.user.userId);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  // // Gestion de l'upload de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setErrorMessage(null); // Reset any previous error
    }
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append the vehicle data to the FormData object
    formData.append("carBrand", carBrand);
    formData.append("model", model);
    formData.append("firstRegistrationDate", firstRegistrationDate);
    formData.append("registration", registration);
    formData.append("vin", vin);
    formData.append("userId", userId); // Assuming userId is a string or number

    // Append the file to FormData (assuming `file` is a File object)
    if (file) {
      formData.append("file", file); // Ensure file exists before appending
    }

    try {
      await registerVehicles(formData);
      alert("The vehicle has been successfully registered!");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "WRONG_EXTENSION") {
          setErrorMessage(
            "Invalid file format. Please upload a .png, .jpg, .jpeg, or .pdf file."
          );
        } else if (error.message === "FILE_TOO_LARGE") {
          setErrorMessage(
            "File is too large. Please upload a file smaller than 5MB."
          );
        } else {
          alert("Failed to register the vehicle. Please try again.");
        }
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Validation du formulaire avant soumission
  const isFormValid = (): boolean => {
    return (
      carBrand.length > 1 &&
      model.length > 1 &&
      firstRegistrationDate.length > 1 &&
      registration.length > 1 &&
      vin.length > 1 &&
      file !== null
    );
  };

  return (
    <section>
      <div className="m-2 xl:m-5 flex flex-col xl:flex-row gap-5">
        <div className="w-full xl:w-6/12 gap-5 xl:gap-0 flex flex-col">
          <h1 className="text-4xl text-center my-5">Register Your Car</h1>
          <form onSubmit={handleSubmit}>
            <fieldset className="xl:m-12 flex flex-col gap-5">
              {/* Ligne 1 : Car Brand et Model */}
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="carBrand">Car Brand*</label>
                  <input
                    className="border border-1 px-2 py-2.5"
                    type="text"
                    name="carBrand"
                    value={carBrand}
                    onChange={(e) => setCarBrand(e.target.value)}
                    placeholder="Enter car brand"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="model">Model*</label>
                  <input
                    className="border border-1 px-2 py-2.5"
                    type="text"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Enter car model"
                  />
                </div>
              </div>

              {/* Ligne 2 : First Registration Date et Registration */}
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="relative flex flex-col gap-1.5 w-full">
                  <label htmlFor="firstRegistrationDate">
                    First Registration Date*
                  </label>
                  <input
                    className="border border-1 px-2 py-2.5 w-full"
                    type="date"
                    name="firstRegistrationDate"
                    value={firstRegistrationDate}
                    onChange={(e) => setFirstRegistrationDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="registration">Registration Number*</label>
                  <input
                    className="border border-1 px-2 py-2.5"
                    type="text"
                    name="registration"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                    placeholder="Enter the car's registration number"
                  />
                </div>
              </div>

              {/* Ligne 3 : VIN */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="vin">
                  Vehicle Identification Number (VIN)*
                </label>
                <input
                  className="border border-1 px-2 py-2.5 w-full"
                  type="text"
                  name="vin"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  placeholder="Enter VIN"
                />
              </div>

              {/* Ligne 4 : Upload File */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="file">Upload file*</label>
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
                    value={file?.name || "jpg, jpeg, png or pdf"}
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
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
                  // disabled={!isFormValid()}
                >
                  Save
                </button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="w-full lg:w-6/12 max-w-[50vw] mx-auto xl:mx-0">
          <Image
            src={immatImage}
            alt="Registration image"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterCar;

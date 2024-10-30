"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  askUpdateService,
  askDeleteService,
  fetchServiceById,
} from "../../../services/apiService";

const EditDeleteService: React.FC = () => {
  const [interventionDate, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [kilometers, setKilometers] = useState<number | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId: string = searchParams.get("serviceId") || "";
  const vehicleId: string = searchParams.get("vehicleId") || "";
  const editQuery: boolean = searchParams.has("edit") || false;
  const deleteQuery: boolean = searchParams.has("delete") || false;

  // Fetch service data when component mounts
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const service = await fetchServiceById(serviceId);
        setDate(service.interventionDate);
        setDescription(service.description);
        setPrice(service.price);
        setKilometers(service.kilometers);
      } catch (error) {
        console.error("Failed to load service data");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId && editQuery) {
      fetchServiceData();
    }
  }, [serviceId, editQuery]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setErrorMessage(null); // Reset any previous error
    }
  };

  const handleKilometersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKilometers(value ? Number(value) : undefined); // Handle empty input
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      // Allow only non-negative numbers
      setPrice(value ? Number(value) : undefined);
    }
  };

  const resetForm = () => {
    if (editQuery) {
      setComment(""),
        setDate(""),
        setPrice(undefined),
        setDescription(""),
        setKilometers(undefined),
        setFile(null);
    } else {
      setComment(""), setFile(null);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("interventionDate", interventionDate);
    formData.append("description", description);
    formData.append(
      "kilometers",
      kilometers !== undefined ? kilometers.toString() : ""
    );

    // Vérifiez que price est défini avant de l'ajouter à formData
    if (price !== undefined && price !== null) {
      formData.append("price", price.toString());
    }

    formData.append("serviceId", serviceId);
    formData.append("comment", comment);

    if (file) {
      formData.append("file", file);
    }

    try {
      await askUpdateService(formData);
      alert("Request send successfully to the admin!");
      router.push(`/services?vehicleId=${vehicleId}`);
      resetForm();
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
          alert("Failed to register the intervention. Please try again.");
        }
      }
      console.error("Failed to update the service:", error);
    }
  };

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("serviceId", serviceId);
    formData.append("comment", comment);

    if (file) {
      formData.append("file", file);
    }

    try {
      await askDeleteService(formData);
      alert("Request send successfully to the admin!");
      router.push(`/services?vehicleId=${vehicleId}`);
      resetForm();
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
          alert("Failed to register the intervention. Please try again.");
        }
      }
      console.error("Failed to update the service:", error);
    }
  };

  const isEditFormValid = (): boolean => {
    return (
      interventionDate.length > 1 &&
      description.length > 1 &&
      kilometers !== undefined &&
      kilometers > 0 &&
      file !== null &&
      comment.length > 1
    );
  };

  const isDeleteFormValid = (): boolean => {
    return file !== null && comment.length > 1;
  };

  return (
    <section>
      <div className="edit-section">
        <h1 className="text-4xl text-center my-5">
          {editQuery ? "Edit Service" : "Delete Service"}
        </h1>
        <div className="m-2 xl:m-5 flex flex-col xl:flex-row gap-5 justify-center">
          <div className="w-full xl:w-6/12 gap-5 xl:gap-0 flex flex-col">
            <p className="text-left xl:ml-12">
              To prevent any fraud, please provide a detailed comment along with
              an attachment that justifies your modification. Your request will
              then be reviewed and approved within 48 hours.
            </p>
            {editQuery && (
              <>
                {loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <form onSubmit={handleSubmitEdit}>
                    <fieldset className="xl:m-12 flex flex-col gap-5">
                      {/* Date */}
                      <div className="relative flex flex-col gap-1.5 w-full">
                        <label htmlFor="date">Date*</label>
                        <input
                          className="border border-1 px-2 py-2.5 w-full"
                          type="date"
                          name="InterventionDate"
                          value={interventionDate}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-1.5 w-full">
                        <label htmlFor="description">Description*</label>
                        <input
                          className="border border-1 px-2 py-2.5"
                          type="text"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter the Description"
                        />
                      </div>

                      {/* Kilometers */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="kilometers">Kilometers*</label>
                        <input
                          className="border border-1 px-2 py-2.5 w-full"
                          type="number"
                          name="kilometers"
                          value={kilometers !== undefined ? kilometers : ""}
                          onChange={handleKilometersChange}
                          placeholder="Enter kilometers"
                        />
                      </div>

                      {/* Price */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="price">Price</label>
                        <input
                          className="border border-1 px-2 py-2.5 w-full"
                          type="number"
                          name="price"
                          value={price !== undefined ? price : ""}
                          onChange={handlePriceChange}
                          placeholder="Enter price"
                        />
                      </div>

                      {/* File Upload */}
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
                            className="bg-blue text-white px-4 py-2 cursor-pointer"
                          >
                            Browse
                          </label>
                        </div>
                        {errorMessage && (
                          <p style={{ color: "red" }}>{errorMessage}</p>
                        )}
                      </div>

                      {/* Comment */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="comment">Comment*</label>
                        <textarea
                          id="comment"
                          name="comment"
                          value={comment}
                          className="p-2"
                          onChange={handleCommentChange}
                          placeholder="Ajouter un commentaire..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="mt-3">
                        <button
                          className={`${
                            isEditFormValid()
                              ? "bg-blue hover:bg-bluedark"
                              : "bg-gray-300 cursor-not-allowed"
                          } px-2 py-2.5 w-full text-white`}
                          type="submit"
                          disabled={!isEditFormValid()}
                        >
                          Request for validation
                        </button>
                      </div>
                    </fieldset>
                  </form>
                )}
              </>
            )}
            {deleteQuery && (
              <form onSubmit={handleSubmitDelete}>
                <fieldset className="xl:m-12 flex flex-col gap-5">
                  {/* File Upload */}
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
                        className="bg-blue text-white px-4 py-2 cursor-pointer"
                      >
                        Browse
                      </label>
                    </div>
                    {errorMessage && (
                      <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="comment">Comment*</label>
                    <textarea
                      id="comment"
                      name="comment"
                      value={comment}
                      className="p-2"
                      onChange={handleCommentChange}
                      placeholder="Ajouter un commentaire..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="mt-3">
                    <button
                      className={`${
                        isDeleteFormValid()
                          ? "bg-blue hover:bg-bluedark"
                          : "bg-gray-300 cursor-not-allowed"
                      } px-2 py-2.5 w-full text-white`}
                      type="submit"
                      disabled={!isDeleteFormValid()}
                    >
                      Request for validation
                    </button>
                  </div>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditDeleteService;

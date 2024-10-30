"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "../../../services/apiUser";
import eyeShowIcon from "../../public/assets/eye-show.svg";
import eyeHideIcon from "../../public/assets/eye-hide.svg";
import Image from "next/image";

interface CustomError extends Error {
  code: string;
  message: string;
}

const ResetPassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error message
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match");
      return;
    }

    const formData = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    try {
      setLoading(true);
      await updatePassword(formData);
      alert("Password updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      const customError = error as CustomError;
      if (customError.code === "current_password_mismatch") {
        setError("The current password is invalid");
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Failed to update password:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = (): boolean => {
    return (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      confirmPassword.length > 0
    );
  };

  return (
    <section className="flex justify-center">
      <div className="reset-password-section w-full lg:w-6/12">
        <h1 className="text-4xl text-center my-5">Reset Password</h1>
        <div className="m-2 xl:m-5 flex flex-col gap-5 justify-center">
          <div className="gap-5 lg:gap-0 flex flex-col">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <fieldset className="xl:m-12 flex flex-col gap-5">
                  {/* Current Password */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="currentPassword">Current Password*</label>
                    <input
                      className="border border-1 px-2 py-2.5 w-full"
                      type="password"
                      name="currentPassword"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="newPassword">New Password*</label>
                    <div className="relative w-full">
                      <input
                        className="border border-1 px-2 py-2.5 w-full"
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <Image
                            src={eyeShowIcon}
                            alt="Show password"
                            width={24}
                            height={24}
                          />
                        ) : (
                          <Image
                            src={eyeHideIcon}
                            alt="Hide password"
                            width={24}
                            height={24}
                          />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="confirmPassword">
                      Confirm New Password*
                    </label>
                    <input
                      className="border border-1 px-2 py-2.5 w-full"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {/* Error Message */}
                  {error && <p style={{ color: "red" }}>{error}</p>}

                  {/* Submit Button */}
                  <div className="mt-3">
                    <button
                      className={`${
                        isFormValid()
                          ? "bg-blue hover:bg-bluedark"
                          : "bg-gray-300 cursor-not-allowed"
                      } px-2 py-2.5 w-full text-white`}
                      type="submit"
                      disabled={!isFormValid()}
                    >
                      Save Changes
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

export default ResetPassword;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserProfile, updateUserProfile } from "../../../services/apiUser";

const Profile: React.FC = () => {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [patternEmail] = useState<RegExp>(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
  );
  const [emailError, setEmailError] = useState<boolean>(false);
  const [hasCorrectEmail, setEmailStatus] = useState<boolean>(false);

  const router = useRouter();

  // Load user profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const user = await fetchUserProfile();
        setLastName(user.last_name);
        setFirstName(user.first_name);
        setEmail(user.email);
      } catch (error) {
        console.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      last_name: lastName,
      first_name: firstName,
      email,
    };

    try {
      await updateUserProfile(formData);
      alert("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const checkEmail = () => {
    setEmailError(false);
    patternEmail.test(email) ? setEmailStatus(true) : setEmailStatus(false);
  };

  const checkInputValid = () => {
    if (!hasCorrectEmail) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const isFormValid = (): boolean => {
    return (
      lastName.length > 1 &&
      firstName.length > 1 &&
      email.length > 1 &&
      hasCorrectEmail
    );
  };

  return (
    <section className="flex justify-center">
      <div className="profile-section w-full lg:w-6/12">
        <h1 className="text-4xl text-center my-5">Profile</h1>
        <div className="m-2 xl:m-5 flex flex-col gap-5 justify-center">
          <div className="gap-5 lg:gap-0 flex flex-col">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <fieldset className="xl:m-12 flex flex-col gap-5">
                  {/* Last Name */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="lastName">Last Name*</label>
                    <input
                      className="border border-1 px-2 py-2.5 w-full"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  {/* First Name */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="firstName">First Name*</label>
                    <input
                      className="border border-1 px-2 py-2.5 w-full"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <label htmlFor="email">Email*</label>
                    <input
                      className="border border-1 px-2 py-2.5 w-full"
                      type="email"
                      name="email"
                      value={email}
                      onKeyUp={checkEmail}
                      onBlur={checkInputValid}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                      <p style={{ color: "red" }}>
                        Enter a valid email address
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <p className="text-right">
                      Reset password ?{" "}
                      <a href="/resetpassword" className="underline">
                        Reset
                      </a>
                    </p>
                  </div>

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
                      Update profile
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

export default Profile;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import signupImage from "../../public/assets/signup.jpeg";
import { signup } from "../../../services/apiUser";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/authSlice";
import { AppDispatch } from "../../../store/store";
import { setUserId } from "../../../store/userSlice";

export default function Register() {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isAdmin: boolean = false;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [patternEmail] = useState<RegExp>(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
  );
  const [emailError, setEmailError] = useState<boolean>(false);
  const [hasCorrectEmail, setEmailStatus] = useState<boolean>(false);

  const resetForm = () => {
    setEmail(""), setPassword(""), setFirstName(""), setLastName("");
  };

  const submitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const userData = {
      last_name: lastName,
      first_name: firstName,
      email,
      password,
      is_admin: isAdmin,
    };
    try {
      const response = await signup(userData);
      const data = await response.json();
      if (data.token) {
        dispatch(setToken(data.token)); // Stocke le token dans Redux
        dispatch(setUserId(data.userId));
        router.push("/dashboard");
      }
      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup error:", error.message); // Log the error
      }
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

  const formValid = (): boolean => {
    return (
      lastName.length > 1 &&
      firstName.length > 1 &&
      email.length > 1 &&
      password.length > 1 &&
      hasCorrectEmail
    );
  };

  return (
    <section>
      <div className="m-2 xl:m-5 flex flex-col lg:flex-row gap-5">
        <div className="w-full xl:w-6/12 gap-5 flex flex-col">
          <h1 className="text-5xl text-center m-5">Sign Up for free</h1>
          <form>
            <fieldset className="xl:m-12 flex flex-col gap-5">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    className="border border-1 px-2 py-2.5"
                    type="text"
                    name="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="first-name">First Name</label>
                  <input
                    className="border border-1 px-2 py-2.5"
                    type="text"
                    name="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email">Email</label>
                <input
                  className="border border-1 px-2 py-2.5 w-full"
                  type="text"
                  name="email"
                  value={email}
                  onKeyUp={checkEmail}
                  onBlur={checkInputValid}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p style={{ color: "red" }}>Enter a valid email address</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password">Password</label>
                <input
                  className="border border-1 px-2 py-2.5 w-full"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <button
                  className={`${
                    formValid()
                      ? "bg-blue hover:bg-bluedark"
                      : "bg-grey text-greydark"
                  } px-2 py-2.5 w-full text-white`}
                  type="submit"
                  disabled={!formValid()}
                  onClick={submitForm}
                >
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="w-full">
          <Image
            src={signupImage}
            alt="sign up image"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}

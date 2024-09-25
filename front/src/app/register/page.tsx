"use client";
import React, { useState } from "react";
import Image from "next/image";
import signupImage from "../../public/assets/signup.jpeg";
import { signup } from "../../../services/apiUser";

export default function Register() {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const userData = {
      last_name: lastName,
      first_name: firstName,
      email,
      password,
    };
    try {
      await signup(userData); // Call the signup service
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup error:", error.message); // Log the error
      }
    }
  };

  const formValid = (): boolean => {
    return (
      lastName.length > 1 &&
      firstName.length > 1 &&
      email.length > 1 &&
      password.length > 1
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password">Password*</label>
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
                    formValid() ? "bg-blue" : "bg-grey text-greydark"
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
            layout="responsive"
            src={signupImage}
            width={100}
            height={100}
            alt="sign up logo"
          />
        </div>
      </div>
    </section>
  );
}

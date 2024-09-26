"use client";
import React, { useState } from "react";
import Image from "next/image";
import loginImage from "../../public/assets/login.jpeg";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const resetForm = () => {
    setEmail(""), setPassword("");
  };

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    resetForm();
  };

  const formValid = (): boolean => {
    return email.length > 1 && password.length > 1;
  };

  return (
    <section>
      <div className="m-2 xl:m-5 flex flex-col lg:flex-row gap-5">
        <div className="w-full xl:w-6/12 gap-5 flex flex-col">
          <h1 className="text-5xl text-center m-5">Welcome</h1>
          <form>
            <fieldset className="xl:m-12 flex flex-col gap-5">
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
            src={loginImage}
            alt="login image"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}

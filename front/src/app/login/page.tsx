"use client";
import React, { useState } from "react";
import Image from "next/image";
import loginImage from "../../public/assets/login.jpeg";
import { signin } from "../../../services/apiUser";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "../../../store/authSlice";
import { AppDispatch } from "../../../store/store";
import { setUserId, setUserAdminStatus } from "../../../store/userSlice";

interface CustomError extends Error {
  code: string;
  message: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [hasNoAccount, setNoAccount] = useState<boolean>(false);
  const [hasPasswordError, setPasswordError] = useState<boolean>(false);

  const resetForm = () => {
    setEmail(""), setPassword("");
  };

  const resetPasswordError = () => {
    setPasswordError(false);
  };

  const resetEmailError = () => {
    setNoAccount(false);
  };

  const submitForm = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };
    try {
      const response = await signin(userData);
      const data = await response.json();
      if (data.token) {
        dispatch(setToken(data.token)); // Stocke le token dans Redux
        dispatch(setUserId(data.userId));
        dispatch(setUserAdminStatus(data.userAdmin));

        // Rediriger en fonction du statut admin
        if (data.userAdmin) {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
      resetForm();
    } catch (error) {
      const customError = error as CustomError;
      if (customError.code === "user_not_found") {
        setNoAccount(true);
      } else if (customError.code === "wrong_password") {
        setPasswordError(true);
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Signin error:", error); // Log the error
    }
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
                  onKeyUp={resetEmailError}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {hasNoAccount && (
                  <p style={{ color: "red" }}>
                    No account associated with this email address. Please create
                    an account
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password">Password</label>
                <input
                  className="border border-1 px-2 py-2.5 w-full"
                  type="password"
                  name="password"
                  value={password}
                  onKeyUp={resetPasswordError}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {hasPasswordError && (
                  <p style={{ color: "red" }}>Wrong password</p>
                )}
              </div>
              <p>
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline">
                  Sign up
                </a>
              </p>

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

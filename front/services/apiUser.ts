import { UserProfile, type UserPayLoad, type UserSignInPayLoad } from "../types/users";

const API_URL = "http://localhost:3000/api";

export const signup = async (userData: UserPayLoad): Promise<Response> => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    return response; // Return the response for further handling
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during signup:", error.message);
      throw new Error(error.message || "Unknown error occurred during signup");
    }
    throw new Error("Unknown error occurred");
  }
};

export const signin = async (userData: UserSignInPayLoad): Promise<Response> => {
  try {
    const response = await fetch(`${API_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signin failed");
    }

    return response; // Return the response for further handling
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during signin:", error.message);
      throw new Error(error.message || "Unknown error occurred during signin");
    }
    throw new Error("Unknown error occurred");
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Log out failed");
    }

    return response; // Return the response for further handling
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during log out:", error.message);
      throw new Error(error.message || "Unknown error occurred during log out");
    }
    throw new Error("Unknown error occurred");
  }
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Fetching user informations failed");
    }

    return response.json(); // Return the response for further handling
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during fetching user informations:", error.message);
      throw new Error(error.message || "Unknown error occurred during fetching user informations");
    }
    throw new Error("Unknown error occurred");
  }
}


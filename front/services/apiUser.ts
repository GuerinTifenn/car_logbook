import { type UserPayLoad } from '../types/users';

const API_URL = 'http://localhost:3000/api/signup';

export const signup = async (userData: UserPayLoad): Promise<Response> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }

    return response; // Return the response for further handling
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error during signup:', error.message);
      throw new Error(error.message || 'Unknown error occurred during signup');
    }
    throw new Error('Unknown error occurred');
  }
};

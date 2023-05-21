/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = "http://localhost:8888";

export const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json;
  } catch (error) {
    throw (error as Error).message;
  }
};

export const loginUser = async (
  username: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData: { message: string } = data;
      throw new Error(errorData.message);
    }

    if (rememberMe) {
      localStorage.setItem("userSession", JSON.stringify(data));
    }

    return data;
  } catch (error) {
    throw (error as Error).message;
  }
};

export const getUser = async (username: string | undefined): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${username}`);
    const data = await response.json();

    if (!response.ok) {
      const error = data.error || "An error occured";
      throw new Error(error);
    }

    return data;
  } catch (error: any) {
    throw new Error("An error occurred");
  }
};

export const getSavedUserSession = (): any => {
  const userSession = localStorage.getItem("userSession");

  if (userSession) {
    return JSON.parse(userSession);
  }

  return null;
};

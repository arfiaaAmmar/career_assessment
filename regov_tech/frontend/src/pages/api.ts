const API_BASE_URL = "http://localhost:8888";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
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

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData: { message: string } = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw (error as Error).message;
  }
};

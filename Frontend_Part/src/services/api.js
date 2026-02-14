const API_BASE = "http://localhost:5000/api";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);

  const data = await response.json();

  if (!response.ok) {
    // throw new Error(data.message || "Something went wrong");
    throw data;
  }

  return data;
};

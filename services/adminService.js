const API = "http://localhost:5000/api/admin";

function getToken() {
  return localStorage.getItem("token");
}

export async function getDashboardStats() {
  const response = await fetch(`${API}/dashboard`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return await response.json();
}
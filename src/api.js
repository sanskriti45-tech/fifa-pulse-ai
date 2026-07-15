const API_URL = "http://localhost:8080";

export async function getDashboardData() {
  const response = await fetch(`${API_URL}/api/dashboard`);
  const data = await response.json();
  return data;
}
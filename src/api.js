export const API_URL = import.meta.env.VITE_API_URL || "https://fifa-pulse-ai.onrender.com";

export async function getDashboardData() {
  const response = await fetch(`${API_URL}/api/dashboard`);
  const data = await response.json();
  return data;
}

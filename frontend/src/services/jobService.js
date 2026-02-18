const API_URL = "http://localhost:8080/api/jobs";

export const getAllJobs = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error interno");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchExternalJobs = async (query) => {
  if (!query) return [];

  try {
    const response = await fetch(`${API_URL}/external/${query}`);

    if (!response.ok) throw new Error("Error externo");

    return await response.json();
  } catch (error) {
    console.error("Error buscando afuera:", error);
    return [];
  }
};

export const getJobById = async (id) => {
  const response = await fetch(`http://localhost:8080/jobs/${id}`);
  if (!response.ok) return null;
  return await response.json();
};

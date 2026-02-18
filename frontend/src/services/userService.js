const API_BASE_URL = "http://localhost:8080/api/user";

// 1. LOGIN
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error("Error en las credenciales");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 2. REGISTRO
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || "Error al registrarse");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 3. OBTENER PERFIL
export const getMyProfile = async (id) => {
  try {
    const url = id ? `${API_BASE_URL}/${id}` : `${API_BASE_URL}/me`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener perfil");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 4. ACTUALIZAR PERFIL
export const updateUserProfile = async (id, userData) => {
  try {
    const url = id ? `${API_BASE_URL}/${id}` : `${API_BASE_URL}/me`;

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error("Error actualizando perfil");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 5. GUARDAR FAVORITO
export const toggleJobSave = async (userId, jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) throw new Error("Error al guardar favorito");
    return true;
  } catch (error) {
    console.error("Error en toggleJobSave:", error);
    return false;
  }
};

export const applyToJob = async (userId, jobData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    return response.ok;
  } catch (error) {
    console.error("Error aplicando:", error);
    return false;
  }
};

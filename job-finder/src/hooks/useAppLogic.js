import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs, searchExternalJobs } from "../services/jobService";
import {
  getMyProfile,
  loginUser,
  toggleJobSave,
} from "../services/userService";

export function useAppLogic() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Dark mode desde localstorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme === "true";
  });

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);

      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error("Error cargando trabajos", error);
      }

      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        try {
          const userData = await getMyProfile(storedUserId);
          if (userData) {
            setUser(userData);
            if (userData.savedJobs) {
              const ids = userData.savedJobs.map((j) => j.id || j.externalId);
              setSavedJobIds(ids);
            }
          }
        } catch (error) {
          console.error("Error recuperando sesión", error);
        }
      }
      setIsLoading(false);
    };

    initData();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // --- HANDLERS ---

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    try {
      const userData = await loginUser(credentials);
      if (userData) {
        setUser(userData);
        localStorage.setItem("userId", userData.id);

        if (userData.savedJobs) {
          const ids = userData.savedJobs.map((j) => j.id || j.externalId);
          setSavedJobIds(ids);
        }
        navigate("/");
      } else {
        alert("Error al iniciar sesión. Verifica tus credenciales.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al intentar ingresar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSavedJobIds([]);
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleExecuteSearch = async () => {
    if (!searchTerm.trim()) {
      setIsLoading(true);
      const data = await getAllJobs();
      setJobs(data);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setJobs([]);
    try {
      const externalData = await searchExternalJobs(searchTerm);
      setJobs(externalData);
    } catch (error) {
      console.error("Error en búsqueda", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSave = async (jobId) => {
    const jobToSave = jobs.find(
      (j) => j.id === jobId || j.externalId === jobId
    );

    const finalJob =
      jobToSave ||
      user?.savedJobs?.find((j) => j.id === jobId || j.externalId === jobId);

    if (!finalJob || !user) return;

    if (savedJobIds.includes(jobId)) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
    } else {
      setSavedJobIds((prev) => [...prev, jobId]);
    }

    try {
      await toggleJobSave(user.id, finalJob);

      const updatedUser = await getMyProfile(user.id);
      if (updatedUser) setUser(updatedUser);
    } catch (error) {
      console.error("Error al guardar/eliminar trabajo", error);
      alert("Hubo un error al guardar el empleo.");
    }
  };

  return {
    user,
    jobs,
    savedJobIds,
    isLoading,
    darkMode,
    searchTerm,
    setUser,
    setSearchTerm,
    setDarkMode,
    handleLogin,
    handleLogout,
    handleExecuteSearch,
    handleToggleSave,
    navigate,
  };
}

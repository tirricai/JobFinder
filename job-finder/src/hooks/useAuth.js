import { useEffect, useState } from "react";
import { getMyProfile, loginUser } from "../services/userService";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedId = localStorage.getItem("userId");
      if (storedId) {
        const userData = await getMyProfile(storedId);
        if (userData) setUser(userData);
      }
      setLoadingUser(false);
    };
    initAuth();
  }, []);

  const login = async (creds) => {
    setLoadingUser(true);
    try {
      const userData = await loginUser(creds);
      if (userData) {
        setUser(userData);
        localStorage.setItem("userId", userData.id);
        return true;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUser(false);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  return { user, setUser, login, logout, loadingUser };
}

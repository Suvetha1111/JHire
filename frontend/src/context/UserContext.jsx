import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check if the user is authenticated
  const fetchUser = async () => {
    if (user) return; 

    setLoading(true);
    try {
      const response = await api.get("/auth/check-session", { withCredentials: true });
      if (response.data.isAuthenticated) {
        setUser(response.data.user || null);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Runs on page refresh & URL changes (ensures auth state persists)
  useEffect(() => {
    let isMounted = true; 
    fetchUser().finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false; 
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContext;

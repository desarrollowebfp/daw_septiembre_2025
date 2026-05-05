import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //Intentamos obtener el token del localStorage nada más arrancar
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      const res = await getMe(token);

      if (res.error) {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        return;
      }

      setUser(res);
    };
    loadUser();
  }, [token]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//Hook custom para usar el contexto más cómodamente
export const useAuth = () => useContext(AuthContext);

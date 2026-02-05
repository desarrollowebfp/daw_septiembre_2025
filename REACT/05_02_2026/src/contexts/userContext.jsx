import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  const userAlert = () => {
    alert("El usuario se llama: " + username);
  };

  const value = { username, setUsername, userAlert };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

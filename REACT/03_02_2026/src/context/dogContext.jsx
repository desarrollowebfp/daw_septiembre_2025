import { createContext, useState } from "react";

//Creamos el canal (CONTEXTO)
export const DogContext = createContext(null);

//Creamos el proveedor (PROVIDER)
export const DogProvider = ({ children }) => {
  const [dogName, setDogName] = useState("Byron");

  const renameDog = (newName) => setDogName(newName);

  //La carga util con la que proveer a mis children
  const value = { dogName, renameDog };

  return <DogContext.Provider value={value}>
                {children}
        </DogContext.Provider>;
};

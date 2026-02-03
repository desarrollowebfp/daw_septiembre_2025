import DogPanel from "./DogPanel";
import { DogProvider } from "../context/dogContext";

const Sidebar = () => {
  return (
    <>
      <DogProvider>
        <DogPanel />
      </DogProvider>
    </>
  );
};

export default Sidebar;

import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

const Welcome = () => {
  const { username } = useContext(UserContext);
  return (
    <main>
      <h2>Welcome {username !== "" && username}</h2>
    </main>
  );
};

export default Welcome;

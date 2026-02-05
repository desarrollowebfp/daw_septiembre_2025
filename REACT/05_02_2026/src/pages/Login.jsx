import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

const Login = () => {
  const { setUsername, userAlert } = useContext(UserContext);

  return (
    <main>
      <h2>Login</h2>
      <input type="text" onChange={(ev) => setUsername(ev.target.value)} />
      <button onClick={userAlert}>Alerta</button>
    </main>
  );
};

export default Login;

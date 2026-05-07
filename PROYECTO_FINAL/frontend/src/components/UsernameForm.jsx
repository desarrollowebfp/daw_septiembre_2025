import { useState } from "react";
import { updateUsername } from "../services/api";
import { useAuth } from "../context/AuthContext";

const UsernameForm = ({ onMessage }) => {
  const { token, user, setUser, loadUser } = useAuth();
  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const res = await updateUsername(token, username);
    if (res.error) {
      onMessage(res.error);
      return;
    }
    loadUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cambiar username</h2>
      <input
        type="text"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <button type="submit">Guardar username</button>
    </form>
  );
};

export default UsernameForm;

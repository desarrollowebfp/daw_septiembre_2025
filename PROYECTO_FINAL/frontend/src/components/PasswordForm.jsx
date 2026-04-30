import { useState } from "react";
import { updatePassword } from "../services/api";
import { useAuth } from "../context/AuthContext";

const PasswordForm = ({ onMessage }) => {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const res = await updatePassword(token, currentPassword, newPassword);
    onMessage(res.message);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <section>
      <h2>Cambiar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Contraseña actual"
          value={currentPassword}
          onChange={(ev) => setCurrentPassword(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña nueva"
          value={newPassword}
          onChange={(ev) => setNewPassword(ev.target.value)}
        />
        <button type="submit">Guardar contraseña</button>
      </form>
    </section>
  );
};

export default PasswordForm;

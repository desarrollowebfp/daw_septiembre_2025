import { useState } from "react";
import { updateAvatar } from "../services/api";
import { useAuth } from "../context/AuthContext";

const AvatarForm = ({ onMessage }) => {
  const { token, setUser, loadUser } = useAuth();
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const data = new FormData();

    if (avatar) {
      data.append("avatar", avatar);
    }

    const res = await updateAvatar(token, data);

    if (res.error) {
      onMessage(res.error);
      return;
    }

    loadUser()
    onMessage("Avatar actualizado correctamente");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cambiar Avatar</h2>
      <input type="file" onChange={(ev) => setAvatar(ev.target.files[0])} />
      <button type="submit">Guardar Avatar</button>
    </form>
  );
};

export default AvatarForm;

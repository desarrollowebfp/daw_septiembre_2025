import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import UsernameForm from "../components/UsernameForm";
import PasswordForm from "../components/PasswordForm";
import AvatarForm from "../components/AvatarForm";

const Profile = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  return (
    <section>
      <h1>Profile</h1>
      {user?.avatar && <img src={user.avatar} alt={user.username} />}
      <UsernameForm onMessage={setMessage} />
      <PasswordForm onMessage={setMessage} />
      <AvatarForm onMessage={setMessage} />
      {message && <p>{message}</p>}
    </section>
  );
};

export default Profile;

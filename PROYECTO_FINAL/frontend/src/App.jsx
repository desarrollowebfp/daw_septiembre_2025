import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <Navbar token={token} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;

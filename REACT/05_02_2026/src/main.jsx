import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Welcome from "./pages/Welcome.jsx";
import Gallery from "./pages/Gallery.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <UserProvider>
                <Welcome />
              </UserProvider>
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/login"
            element={
              <UserProvider>
                <Login />
              </UserProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

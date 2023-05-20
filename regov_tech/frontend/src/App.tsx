import { useState } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";

export type UserType = {
  username: string;
  password: string;
  email: string;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <UserProfile onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

export type UserType = {
  username: string,
  password: string,
}

function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<UserType>({
    username: "",
    password: ""
  });

  return (
    <>
      {logged ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      ) : (
        <Login setLogged={setLogged} user={user} setUser={setUser} />
      )}
    </>
  );
}

export default App;

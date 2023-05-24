import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

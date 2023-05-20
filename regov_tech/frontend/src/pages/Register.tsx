import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { registerUser } from "./api";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    registerUser(username, password)
  };

  return (
    <div>
      <h2>Register Form</h2>
      <form>
        <TextField
          label="username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;

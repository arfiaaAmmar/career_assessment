/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { registerUser } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert ] = useState("")
  const { setUser } = useContext(AuthContext)

  const handleRegister = async () => {
    if (email == '' || username == '' || password == '') {
      setUser({username: username})
      setAlert("Please fill required data")
      return
    }

    try {
      const response = await registerUser(email, username, password)
      console.log(response);
      setAlert("Registered successfully")
    } catch (error:any) {
      setAlert(error)
    }
  };

  return (
    <Container sx={{ 
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "1rem"
    }}>
      <Typography variant="h4" sx={{
        color: "black"
      }}>Register Form</Typography>
      <form>
        <TextField
          label="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="username"
          type="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </form>
      {alert && <Typography sx={{ color: "red"}} >{alert}</Typography> }
    </Container>
  );
};

export default Register;

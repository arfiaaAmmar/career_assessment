/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { loginUser } from "./api";
// import { useAuth } from "../context/AuthContext";

type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      console.log(response);
      onLogin()
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="h-screen ">
      <CssBaseline />
      <h1 className="mx-8 my-2 text-2xl font-bold">Welcome</h1>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Username"
        onChange={(e: any) => setUsername(e.target.value)}
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={(e: any) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleLogin}
        sx={{
          backgroundColor: "#ed2124",
        }}
      >
        Login
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to="/register">Registration</Link>
        </Grid>
      </Grid>
      {error && <p>{error}</p> }
    </div>
  );
};

export default Login;

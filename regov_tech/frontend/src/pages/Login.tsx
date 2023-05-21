/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { CssBaseline, Typography } from "@mui/material";
import { loginUser } from "./api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (username == "" || password == "") {
      setError("Please enter username and password");
      return;
    }
    try {
      const response = await loginUser(username, password, rememberMe);
      console.log(response);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error("Error logging in:", error);
      setError(error);
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
        control={
          <Checkbox
            value="remember"
            color="primary"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
        }
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
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
    </div>
  );
};

export default Login;

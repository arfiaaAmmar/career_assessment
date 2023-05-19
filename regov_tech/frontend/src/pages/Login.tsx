/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { UserType } from "../App";
// import { useAuth } from "../context/AuthContext";

type LoginProps = {
  setLogged: (logged:any) => void
  setUser: (user:UserType) => void
  user: UserType
}

const Login = ({user, setLogged, setUser}:LoginProps) => {

  const handleSubmit = () => {
    
  }

  return (
    <div className="h-screen ">
      <CssBaseline />
      <h1 className="mx-8 my-2 text-2xl font-bold">Welcome</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="mt-2 mx-8"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username"
          onChange={(e:any) => setUser({...user, username: e.target.value})}
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
          onChange={handleChange}
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
          sx={{
            backgroundColor: "#ed2124",
          }}
        >
          <Link to="/home">Sign In</Link>
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/register">
              Registration
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;

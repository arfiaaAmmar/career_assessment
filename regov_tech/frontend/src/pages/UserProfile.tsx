import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button, Container, Typography } from "@mui/material";

const UserProfile = () => {
  const { user, setIsLoggedIn } = useContext(AuthContext);

  return (
    <Container
      sx={{
        backgroundColor: "white",
        padding: "4rem",
        borderRadius: "1rem",
      }}
      >
      <Typography variant="h4" sx={{color: "black"}}>UserProfile</Typography>
      <Avatar sx={{width: "6rem", height: "6rem", margin: "auto", marginTop: "2rem"}} />
      <Typography sx={{color: "black", marginTop: "1rem", fontWeight: "bold"}}>{user?.username}</Typography>
      <Button sx={{marginTop: "2rem"}} onClick={() => setIsLoggedIn(false)}>Logout</Button>
    </Container>
  );
};

export default UserProfile;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button, Container, Typography } from "@mui/material";
import { getUser } from "../api/api";

const UserProfile = () => {
  const { user, setIsLoggedIn } = useContext(AuthContext);
  const [ data, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser(user?.username);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData()
  }, [user?.username]);

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('userSession')
  }

  return (
    <Container
      sx={{
        backgroundColor: "white",
        padding: "4rem",
        borderRadius: "1rem",
      }}
    >
      <Typography variant="h4" sx={{ color: "black" }}>
        UserProfile
      </Typography>
      <Avatar
        sx={{
          width: "6rem",
          height: "6rem",
          margin: "auto",
          marginTop: "2rem",
        }}
      />
      <Typography
        sx={{ color: "black", marginTop: "1rem", fontWeight: "bold" }}
      >
        Email: {data?.email}
      </Typography>
      <Typography
        sx={{ color: "black", marginTop: "1rem", fontWeight: "bold" }}
      >
        Username: {data?.username}
      </Typography>
      <Button sx={{ marginTop: "2rem" }} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default UserProfile;

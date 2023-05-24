/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext } from "react";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { getUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const [ data, setData] = useState<any>(null);
  const { setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        setData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData()
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate('/login')
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
      <Box display={"flex"} marginTop={2} gap={0.5}>
        <Button sx={{backgroundColor: "blue", color: "white"}}>Add Photo</Button>
        <Button sx={{backgroundColor: "red", color: "white"}}>Remove Photo</Button>
      </Box>
      <Typography
        sx={{ color: "black", marginTop: "1rem", fontWeight: "bold" }}
      >
        Email: <Typography sx={{fontWeight: "normal"}} >{data?.email}</Typography>
      </Typography>
      <Typography
        sx={{ color: "black", marginTop: "1rem", fontWeight: "bold" }}
      >
        Username: <Typography sx={{fontWeight: "normal"}} >{data?.username}</Typography>
      </Typography>
      <Button sx={{ marginTop: "2rem" }} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default UserProfile;

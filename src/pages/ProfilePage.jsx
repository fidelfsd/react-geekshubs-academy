import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import { Container, Typography } from "@mui/material";
import userService from "../_services/userService";

export default function ProfilePage() {
   // hooks
   const [user, setUser] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      getProfile();
   }, []);

   const getProfile = async () => {
      setIsLoading(true);
      try {
         const data = await userService.getProfile(token);
         setUser(data);
         console.log(data);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Container sx={{ mt: 5 }}>
            <Typography
               variant="h1"
               fontSize={40}
               align="center"
               fontWeight={400}
               gutterBottom
            >
               Profile
            </Typography>
         </Container>
      </>
   );
}

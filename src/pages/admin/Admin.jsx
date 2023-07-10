import React, { useEffect, useState } from "react";

// @MUI
import { Container, Typography } from "@mui/material";
import userService from "../../_services/userService";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function Admin() {
   // hooks
   const [users, setUsers] = useState([]);
   const [usersPage, setUsersPage] = useState(1);
   const [isLoading, setIsLoading] = useState(true);
   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      getUsers();
   }, [usersPage]);

   const getUsers = async () => {
      setIsLoading(true);
      try {
         const data = await userService.getAll(token, usersPage);
         setUsers(data.results);
         console.log(data.results);
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
               Admin panel
            </Typography>
         </Container>
      </>
   );
}

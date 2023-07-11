import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// @MUI
import { Container, Typography } from "@mui/material";
import userService from "../_services/userService";

// ----------------------------------------------------------------------

export default function AdminPage() {
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
         const data = await userService.getStudents(token, usersPage);
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

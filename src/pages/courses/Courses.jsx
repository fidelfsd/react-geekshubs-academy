import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function Courses() {
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
               Courses
            </Typography>
         </Container>
      </>
   );
}

import React from "react";

// @MUI
import { Container, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function Admin() {
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

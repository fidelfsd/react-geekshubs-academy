import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AlertTitle, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";

import authService from "../_services/authService";
import { updateAuthStateLogin } from "../features/authentication/updateAuthState";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
   return (
      <Typography
         variant="body2"
         color="text.secondary"
         align="center"
         {...props}
      >
         {"Copyright © "}
         <Link color="inherit" href="https://mui.com/">
            Your Website
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {
   // hooks
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState(null);
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const navigate = useNavigate();
   const userRole = useSelector((state) => state.auth.userInfo.role);
   const isAdmin = userRole == "admin";

   useEffect(() => {
      if (isLoggedIn) {
         if (isAdmin) {
            navigate("/admin");
         } else {
            navigate("/");
         }
      }
   }, [isLoggedIn]);

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const credentials = {
         email: data.get("email"),
         password: data.get("password"),
      };

      // validar en el frontend
      login(credentials);
   };

   const login = async (credentials) => {
      try {
         const response = await authService.login(credentials);
         setError(null);
         updateAuthStateLogin(response.token);
      } catch (error) {
         setError(error.response.data.message);
         console.log(error.response.data.message);
      }
   };

   return (
      <ThemeProvider theme={defaultTheme}>
         {error && (
            <Alert severity="error">
               <AlertTitle>Error</AlertTitle>
               {error}
            </Alert>
         )}

         <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
               sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Login
               </Typography>
               <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
               >
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
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
                     type={showPassword ? "text" : "password"}
                     id="password"
                     autoComplete="current-password"
                     InputProps={{
                        endAdornment: (
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                              >
                                 {showPassword ? (
                                    <VisibilityOff />
                                 ) : (
                                    <Visibility />
                                 )}
                              </IconButton>
                           </InputAdornment>
                        ),
                     }}
                  />

                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Login
                  </Button>
                  <Grid container justifyContent="center">
                     <Grid item>
                        <Link href="#" variant="body2">
                           {"Don't have an account? Register"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
         </Container>
      </ThemeProvider>
   );
}

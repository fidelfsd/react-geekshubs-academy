import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import format from "date-fns/format";

// @MUI
import {
   Avatar,
   Box,
   Button,
   Chip,
   Container,
   CssBaseline,
   Grid,
   IconButton,
   InputAdornment,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   ThemeProvider,
   Typography,
   createTheme,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
import FmdGoodTwoToneIcon from "@mui/icons-material/FmdGoodTwoTone";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { grey } from "@mui/material/colors";

//
import userService from "../_services/userService";

// ----------------------------------------------------------------------

const defaultTheme = createTheme();

const initialFormValues = {
   firstName: "",
   lastName: "",
   email: "",
};

export default function AdminProfilePage() {
   // hooks
   const [showPassword, setShowPassword] = useState(false);
   const [editProfile, setEditProfile] = useState(false);
   const [user, setUser] = useState({});
   const [formValues, setFormValues] = useState(initialFormValues);
   const [isLoading, setIsLoading] = useState(true);

   // glogal state hooks
   const token = useSelector((state) => state.auth.token);

   useEffect(() => {
      getProfile();
   }, []);

   // handlers
   const handleClickEditProfile = () => setEditProfile((edit) => !edit);
   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
         ...formValues,
         [name]: value, // key: value
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
         email: data.get("email"),
         password: data.get("password"),
      });
   };

   const getProfile = async () => {
      setIsLoading(true);
      try {
         const data = await userService.getProfile(token);
         setUser(data);
         setFormValues({
            firstName: data.name,
            lastName: data.last_name,
            email: data.email,
         });
         console.log(data);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   };

   const saveProfile = async () => {
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

   const StudentCourses = ({ courses }) => {
      function createData(name, category) {
         return { name, category };
      }

      const rows = courses.map((course) =>
         createData(course.name, course.category)
      );

      return (
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Name</TableCell>
                     <TableCell align="right">Category</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => (
                     <TableRow
                        key={row.name}
                        sx={{
                           "&:last-child td, &:last-child th": { border: 0 },
                        }}
                     >
                        <TableCell component="th" scope="row">
                           {row.name}
                        </TableCell>
                        <TableCell align="right">
                           {" "}
                           <Chip size="small" label={row.category} />{" "}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      );
   };

   // -----------------------------------------------------------------------------

   return (
      <>
         {!isLoading && (
            <ThemeProvider theme={defaultTheme}>
               <Container component="main" maxWidth="md" sx={{ pb: 5 }}>
                  <CssBaseline />

                  <Box
                     sx={{
                        marginTop: 8,
                        alignItems: "flex-start",
                     }}
                  >
                     <Box sx={{ mt: 1, mb: 4 }}>
                        <AccountCircleRoundedIcon
                           sx={{ fontSize: 90, color: "secondary.light" }}
                        />

                        <Typography component="h1" variant="h4">
                           Profile
                        </Typography>
                     </Box>

                     <Typography component="h2" variant="h4">
                        {user.name} {user.last_name}
                        {user?.active && (
                           <ImportContactsIcon
                              titleAccess={
                                 user.active == "yes" ? "Active" : "Not active"
                              }
                              sx={{
                                 ml: 3,
                                 fontSize: 30,
                                 color:
                                    user.active == "yes"
                                       ? "success.main"
                                       : grey[500],
                              }}
                           />
                        )}
                     </Typography>

                     <List dense={true}>
                        <ListItem>
                           <ListItemIcon>
                              <EmailTwoToneIcon />
                           </ListItemIcon>
                           <ListItemText
                              primary={user?.email}
                              //secondary="Secondary text"
                           />
                        </ListItem>

                        <ListItem>
                           <ListItemIcon>
                              <DateRangeTwoToneIcon />
                           </ListItemIcon>
                           <ListItemText
                              primary={format(
                                 new Date(user.birthday),
                                 "dd/MM/yyyy"
                              )}
                              //secondary="Secondary text"
                           />
                        </ListItem>
                        {user?.address && (
                           <ListItem>
                              <ListItemIcon>
                                 <FmdGoodTwoToneIcon />
                              </ListItemIcon>
                              <ListItemText
                                 primary={`${user.address.street}, ${user.address.number}`}
                                 //secondary="Secondary text"
                              />
                           </ListItem>
                        )}
                     </List>
                  </Box>

                  {user?.courses && (
                     <>
                        <Box sx={{ mt: 5 }}>
                           <Typography component="h3" variant="h5" gutterBottom>
                              Courses
                           </Typography>
                           <StudentCourses courses={user.courses} />
                        </Box>

                        <Box sx={{ mt: 5 }}>
                           <Typography component="h3" variant="h5" gutterBottom>
                              Courses
                           </Typography>
                           {user.courses.map((c) => (
                              <Chip
                                 key={c.name}
                                 label={`${c.name}/${c.category}`}
                              />
                           ))}
                        </Box>
                     </>
                  )}
               </Container>
            </ThemeProvider>
         )}
      </>
   );
}

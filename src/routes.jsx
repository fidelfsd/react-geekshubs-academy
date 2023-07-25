import React from "react";
import { Route, Routes, useRoutes } from "react-router";
import { Navigate } from "react-router-dom";

// pages
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CoursesPage from "./pages/CoursesPage";
import Page404 from "./pages/Page404";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import StudentProfilePage from "./pages/SudentProfilePage";
import AdminProfilePage from "./pages/AdminProfilePage";

export default function Router() {
   const routes = useRoutes([
      {
         path: "/",
         element: <HomePage />,
      },
      {
         path: "/login",
         element: <LoginPage />,
      },
      {
         path: "/register",
         element: <RegisterPage />,
      },
      {
         path: "/profile",
         children: [
            { path: "admin", element: <AdminProfilePage /> },
            { path: "student", element: <StudentProfilePage /> },
         ],
      },
      {
         path: "/courses",
         element: <CoursesPage />,
      },
      {
         path: "/account",
         element: <AccountPage />,
      },
      {
         path: "/admin",
         element: <AdminPage />,
      },
      {
         path: "/about",
         element: <AboutPage />,
      },
      {
         path: "/404",
         element: <Page404 />,
      },
      {
         path: "*",
         element: <Navigate to="/404" />,
      },
   ]);

   return routes;
}

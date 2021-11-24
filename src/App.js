import "./App.css";
import Dashboard from "./pages/Dashboard";
import * as React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassList from "components/Class/ClassList";
import LoginForm from "components/User/Login/LoginForm";
import RegisterForm from "components/User/Register/RegisterForm";
import Profile from "./pages/Profile";
import ClassDetail from "components/Class/ClassDetail";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MyAppBar from "components/MyAppBar";
const mdTheme = createTheme();

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
        Class-rum
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  return (
    <div>
      <ThemeProvider theme={mdTheme}>
        <MyAppBar>
          <Routes>
            <Route path={"classes"} element={<ClassList />} />
            <Route path={"login"} element={<LoginForm />} />
            <Route path={"register"} element={<RegisterForm />} />
            <Route path={"profile"} element={<Profile />} />
            <Route path="/classes/:id" element={<ClassDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Copyright sx={{ pt: 4 }} />
        </MyAppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;

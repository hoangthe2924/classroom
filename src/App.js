import "./App.css";
import Dashboard from "./pages/Dashboard";
import * as React from "react";

import { Routes, Route } from "react-router-dom";
import ClassList from "components/Class/ClassList";
import LoginForm from "components/User/Login/LoginForm";
import RegisterForm from "components/User/Register/RegisterForm";
import Profile from "./pages/Profile";
import ClassDetail from "components/Class/ClassDetail";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyAppBar from "components/MyAppBar";
import DragAndDropForm from "components/Class/ClassTabs/DragAndDropForm";
import ProtectedRoute from "components/Routes/ProtectedRoute";
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
            <Route
              path={"classes"}
              element={
                <ProtectedRoute>
                  <ClassList />
                </ProtectedRoute>
              }
            />
            <Route path={"login"} element={<LoginForm />} />
            <Route path={"register"} element={<RegisterForm />} />
            <Route
              path={"profile"}
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/classes/:id"
              element={
                <ProtectedRoute>
                  <ClassDetail />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Copyright sx={{ pt: 4 }} />
        </MyAppBar>
      </ThemeProvider>
    </div>
  );
}

export default App;

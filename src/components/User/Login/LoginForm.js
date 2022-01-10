import React, { useEffect } from "react";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleLoginButton from "./GoogleLogin";
import { Navigate } from "react-router-dom";
import * as actions from "store/actions/index";
import { useDispatch, useSelector } from "react-redux";

function LoginForm(props) {
  //const { loginStatus } = props;
  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();

  const checkLoginStatus = () => {
    dispatch(actions.checkIsLoggedIn());
  };

  useEffect(() => {
    checkLoginStatus();
  }, [loginStatus]);

  const theme = createTheme();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const tryLogin = dispatch(actions.login(values));
      tryLogin.then((loginSuccess) => {
        if (loginSuccess) {
          checkLoginStatus();
          // navigate(navigateLink);
          // window.location.reload();
        } else {
          alert("incorrect username or password!");
        }
      });
    },
  });

  if (loginStatus === true) {
    let navigateLink = localStorage.getItem("prev-link");
    if (!navigateLink) {
      navigateLink = "/dashboard";
    }
    //localStorage.removeItem('prev-link'); //if we remove this line, it works
    //console.log(navigateLink); //question

    return <Navigate to={navigateLink} />;
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formik.values.subject}
                onChange={formik.handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.subject}
                onChange={formik.handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container justifyContent="center">
                <GoogleLoginButton />
              </Grid>
              <Grid sx={{ mt: 2, mb: 2 }} container justifyContent="center">
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     loginStatus: state.loginStatus,
//   };
// };
// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     checkLoginStatus: () => {

//     },
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginForm;

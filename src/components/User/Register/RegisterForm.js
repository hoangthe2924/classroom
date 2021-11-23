import React from 'react'
import { useFormik } from 'formik'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material/index';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register } from 'services/auth.service';
import * as Yup from 'yup';


export default function LoginForm() {
  const theme = createTheme();
  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First Name is required'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const formik = useFormik({
    initialValues: {
    },
    onSubmit: async (values) => {
      await register(values);

    },
    validationSchema: validationSchema
  });
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="given-name"
                    name="fullname"
                    required
                    fullWidth
                    id="fullname"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    label="Full Name"
                    autoFocus
                  />
                  {formik.errors.fullname && formik.touched.fullname && (
                    <Alert severity="error">{formik.errors.fullname}</Alert>
                  )}
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    autoComplete="user-name"
                  />
                  {formik.errors.username && formik.touched.username && (
                    <Alert severity="error">{formik.errors.username}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    autoComplete="email"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <Alert severity="error">{formik.errors.email}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    id="password"
                    autoComplete="new-password"
                  />
                  {formik.errors.password && formik.touched.password && (
                    <Alert severity="error">{formik.errors.password}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I agree to the terms of service."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item xs={12}>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
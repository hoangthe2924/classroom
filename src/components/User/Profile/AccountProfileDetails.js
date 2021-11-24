import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import http from "axios-config";

export const AccountProfileDetails = ({ item, onUpdate }) => {
  const [values, setValues] = useState(item);
  console.log("v", values);
  console.log("i", item);
  useEffect(() => {
    setValues(item);
  }, [item]);
  const formik = useFormik({
    initialValues: {
      fullname: values.fullname || "",
      studentId: values.studentId || "",
      email: values.email || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await http
        .put("/users/info", values)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200 || res.status === 201) {
            onUpdate();
            alert("Updated profile successfully!");
          } else {
            alert("Please try again later");
          }
        })
        .catch((error) => {
          alert(error.response.data || "Please try again later");
          console.log("err: ", JSON.stringify(error));
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                margin="dense"
                id="fullname"
                name="fullname"
                label="Full name"
                type="text"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                margin="dense"
                id="studentId"
                name="studentId"
                label="Student Id"
                type="tel"
                disabled={!!values.studentId}
                value={formik.values.studentId}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                disabled
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

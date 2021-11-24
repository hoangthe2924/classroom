import React from "react";
import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "components/User/Profile/AccountProfile";
import { AccountProfileDetails } from "components/User/Profile/AccountProfileDetails";
import http from "../axios-config";

export default function Profile() {
  const [item, setItem] = useState([]);

  async function getUserDetail() {
    await http.get(`/users/info`).then(
      (result) => {
        setItem(result.data);
        // return result;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  useEffect(() => {
    getUserDetail();
  }, []);

  const onUpdate = () => {
    getUserDetail();
  };
  return (
    <React.Fragment>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile item={item} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails item={item} onUpdate={onUpdate} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}

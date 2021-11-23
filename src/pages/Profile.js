import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from 'components/User/Profile/AccountProfile';
import { AccountProfileDetails } from 'components/User/Profile/AccountProfileDetails';

export default function Profile() {
    return (
    <React.Fragment>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Account
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </React.Fragment>);
}


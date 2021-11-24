import React from "react";
import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "components/User/Profile/AccountProfile";
import { AccountProfileDetails } from "components/User/Profile/AccountProfileDetails";
import http from "../axios-config";
import * as actions from "../actions/index";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function Profile(props) {
  const { loginStatus } = props;
  useEffect(() => {
    props.checkLoginStatus();
    console.log("stt", loginStatus);
  }, [loginStatus]);

  const [item, setItem] = useState([]);

  async function getUserDetail() {
    const result = await http.get(`/users/info`).then(
      (result) => {
        console.log("uppp", result.data);
        return result.data;
        // return result;
      },
      (error) => {
        console.log(error);
      }
    );
    setItem(result);
  }
  useEffect(() => {
    getUserDetail();
  }, []);

  const onUpdate = () => {
    getUserDetail();
  };
  return (
    <div>
      {loginStatus === true ? (
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
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginStatus,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    checkLoginStatus: () => {
      dispatch(actions.checkIsLoggedIn());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

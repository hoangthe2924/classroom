import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";
export const mainListItems = (
  <div>
    <ListItem component={NavLink} to="/dashboard" button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem component={NavLink} to="/classes" button>
      <ListItemIcon>
        <SchoolIcon />
      </ListItemIcon>
      <ListItemText primary="Classes" />
    </ListItem>
    {/*<ListItem component='a' href={'/student-list'} button>*/}
    {/*  <ListItemIcon>*/}
    {/*    <PeopleIcon />*/}
    {/*  </ListItemIcon>*/}
    {/*  <ListItemText primary="Students" />*/}
    {/*</ListItem>*/}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Account</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Account Info" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

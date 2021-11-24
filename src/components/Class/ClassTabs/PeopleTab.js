import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../../../axios-config";
import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box, Grid
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import InvitationDialog from "components/InvitationUser/InvitationDialog";
import authHeader from "services/auth-header";

export default function PeopleTab({ items }) {
  const [item, setItem] = useState([]);
  let params = useParams();

  useEffect(() => {
    async function fetchClass() {
      let id = params.id;
      await http.get(`/classes/${id}`, { headers: authHeader() }).then(
        (result) => {
          setItem(result.data);
          // return result;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    fetchClass();
  }, []);

  // console.log("u", item.users);
  let teachers = item.users
    ? item.users.filter((user) => user.user_class.role === "teacher")
    : [];
  let students = item.users
    ? item.users.filter((user) => user.user_class.role === "student")
    : [];
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <Box
        sx={{
          mt: 4,
          mb: 2,
          width: "60%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid",
        }}
      >
        <Typography variant="h6" component="div">
          Teachers
        </Typography>
        {items.requesterRole==="teacher" && <InvitationDialog role="teacher" cjc=""/>} 
      </Box>
      <List dense sx={{width: "60%",}}>
        {teachers &&
          teachers.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={user.studentId}
              />
            </ListItem>
          ))}
      </List>
      <Box
        sx={{
          mt: 4,
          mb: 2,
          width: "60%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid",
        }}
      >
        <Typography variant="h6" component="div">
        Students
        </Typography>
        {items.requesterRole==="teacher" && <InvitationDialog role="student" cjc={items.cjc} />}
      </Box>
      <List dense sx={{width: "60%",}}>
        {students &&
          students.map((user) => (
            <ListItem
              key={user.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={user.studentId}
              />
            </ListItem>
          ))}
      </List>
    </Grid>
  );
}

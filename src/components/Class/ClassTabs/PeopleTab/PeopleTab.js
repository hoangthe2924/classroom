import * as React from "react";
import {
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import InvitationDialog from "components/Class/ClassTabs/PeopleTab/InvitationUser/InvitationDialog";
import { stringAvatar } from "services/stringAvatar";

export default function PeopleTab({ items }) {
  let teachers = items.users
    ? items.users.filter((user) => user.user_class.role === "teacher")
    : [];
  let students = items.users
    ? items.users.filter((user) => user.user_class.role === "student")
    : [];
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
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
        {items.requesterRole === "teacher" && (
          <InvitationDialog role="teacher" cjc="" />
        )}
      </Box>
      <List dense sx={{ width: "60%" }}>
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
                <Avatar {...stringAvatar(user.username)} />
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
        {items.requesterRole === "teacher" && (
          <InvitationDialog role="student" cjc={items.cjc} />
        )}
      </Box>
      <List dense sx={{ width: "60%" }}>
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
                <Avatar {...stringAvatar(user.username)} />
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

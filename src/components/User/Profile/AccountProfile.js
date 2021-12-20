import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export const AccountProfile = ({ item }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={item?.avatar || ""}
          sx={{
            height: 64,
            mb: 2,
            width: 64,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h5">
          {item?.fullname}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {item?.username}
        </Typography>
      </Box>
    </CardContent>
    {/* <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
);

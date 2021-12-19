import { Box, Typography } from "@mui/material";
import StudentList from "./StudentList";

export default function GradeBoard({ items }) {
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Students
        </Typography>
        <Box sx={{ m: 1 }}></Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <StudentList items={items} />
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import StudentList from "./StudentList";
import { Link } from "react-router-dom";

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
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Link
            to="/StudentList.csv"
            target="_blank"
            download
            style={{ textDecoration: "none" }}
          >
            <Button
              startIcon={<DownloadIcon fontSize="small" />}
              sx={{ mr: 1 }}
            >
              Download Template
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <StudentList items={items} />
      </Box>
    </Box>
  );
}

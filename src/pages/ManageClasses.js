import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllClasses } from "services/class.service";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "material-ui-search-bar";
import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";

function ManageClasses() {
  const [openLoading, setOpenLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([]);
  const listClass = useSelector((state) => state.classList);
  console.log("lc", listClass);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    fetchClass();
    localStorage.removeItem("prev-link");
  }, []);

  async function fetchClass() {
    setOpenLoading(true);
    await fetchAllClasses().then(
      (result) => {
        dispatch({ type: "FETCH", payload: result.data });
      },
      (error) => {
        console.log(error);
      }
    );
    setOpenLoading(false);
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = listClass.filter((row) => {
      return row.className.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearchText("");
    requestSearch(searchText);
  };

  const columns = [
    {
      field: "classname",
      headerName: "Classname",
      flex: 1.0,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1.0,
    },
    {
      field: "owner.username",
      headerName: "owner",
      flex: 1.0,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      flex: 1.0,
    },
  ];

  return (
    <div>
      <h1>Manage Classes</h1>
      <SearchBar
        value={searchText}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <DataGrid autoHeight columns={columns} rows={listClass} />
      {listClass.map((cls) => (
        <Grid item xs={12} sm={6} md={4} key={cls.id}>
          <Card
            onClick={() => {
              navigate(`/classes/${cls.id}`);
            }}
          >
            <CardActionArea sx={{ minHeight: 200 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {cls.classname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cls.subject}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </div>
  );
}

export default ManageClasses;

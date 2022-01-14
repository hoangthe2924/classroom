import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Button,
  CardMedia,
  Box, IconButton
} from "@mui/material";
import * as PropTypes from "prop-types";
import AddClassForm from "components/Class/AddClassForm";
import JoinClassForm from "components/Class/JoinClassForm";
import { useNavigate } from "react-router-dom";
import { fetchAllClasses } from "services/class.service";
import { useSelector, useDispatch } from "react-redux";
import Loading from "components/Loading";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

function LoadingButton(props) {
  return null;
}

LoadingButton.propTypes = {
  onClick: PropTypes.any,
  variant: PropTypes.string,
  loading: PropTypes.any,
  loadingPosition: PropTypes.string,
  endIcon: PropTypes.element,
  children: PropTypes.node,
};

function ClassList(props) {
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [openJoinClassForm, setOpenJoinClassForm] = useState(false);
  const listClass = useSelector((state) => state.classList);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (formik) => () => {
    formik.resetForm();
    setOpen(false);
  };

  const handleSuccess = () => {
    fetchClass();
  };

  const handleClickOpenJoinClassForm = () => {
    setOpenJoinClassForm(true);
  };

  const handleCloseJoinClassForm = (formik) => () => {
    formik.resetForm();
    setOpenJoinClassForm(false);
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="flex-start"
        padding={5}
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={12} md={12} textAlign="center">
          <Button
            variant="outlined"
            sx={{ float: "center" }}
            onClick={handleClickOpen}
          >
            Add Class
          </Button>
          <Button
            variant="outlined"
            sx={{ float: "center" }}
            onClick={handleClickOpenJoinClassForm}
          >
            Join Class
          </Button>
          <AddClassForm
            open={open}
            handleClose={handleClose}
            onSuccess={handleSuccess}
          />
          <JoinClassForm
            open={openJoinClassForm}
            handleClose={handleCloseJoinClassForm}
            onSuccess={handleSuccess}
          />
        </Grid>
        {listClass.map((cls) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={cls.id}>
            <Card
              sx={{ mx: "auto", minHeight: "220px", maxWidth: "345px" }}
              onClick={() => {
                navigate(`/classes/${cls.id}`);
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`/class-background-${Math.floor(
                    Math.random() * 9 + 1
                  )}.jpg`}
                  alt={cls.subject}
                  sx={{ minHeight: "100px" }}
                />
                <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Box>
                    <Typography gutterBottom variant="h6" component="div">
                      {cls.classname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cls.subject}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    <FolderOpenIcon />
                  </IconButton>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Loading open={openLoading} />
    </div>
  );
}

export default ClassList;

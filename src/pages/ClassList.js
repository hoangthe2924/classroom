import { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import * as PropTypes from "prop-types";
import AddClassForm from "components/Class/AddClassForm";
import JoinClassForm from "components/Class/JoinClassForm";
import { useNavigate } from "react-router-dom";
import { fetchAllClasses } from "services/class.service";
import {useSelector, useDispatch} from 'react-redux';

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
  const [openJoinClassForm, setOpenJoinClassForm] = useState(false);
  const listClass = useSelector(state => state.classList);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    fetchClass();
    localStorage.removeItem('prev-link');
  }, []);

  async function fetchClass() {
    await fetchAllClasses().then(
      (result) => {
        dispatch({type: "FETCH", payload: result.data});
      },
      (error) => {
        console.log(error);
      }
    );
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
        padding={10}
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
      </Grid>
    </div>
  );
}

export default ClassList;

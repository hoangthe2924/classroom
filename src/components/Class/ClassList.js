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
import AddClassForm from "./AddClassForm";
import { useNavigate, Navigate } from "react-router-dom";
import { fetchAllClasses } from "services/class.service";

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
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchClass();
  }, []);

  async function fetchClass() {
    console.log("fet");
    await fetchAllClasses().then(
      (result) => {
        setItems(result.data);
      },
      (error) => {
        navigate("/login");
        console.log(error);
      }
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (formik) => () => {
    console.log("close");
    formik.resetForm();
    setOpen(false);
  };

  const handleSuccess = () => {
    fetchClass();
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
          <AddClassForm
            open={open}
            handleClose={handleClose}
            onSuccess={handleSuccess}
          />
        </Grid>
        {items.map((cls) => (
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

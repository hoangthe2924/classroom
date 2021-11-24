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
import http from "axios-config";
import { useNavigate } from "react-router-dom";

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

export default function ClassList() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
        async function fetchClass() {
            await http.get("/classes").then(
              (result) => {
                if(result.status === 401){
                  navigate("/login");
                }
                setItems(result.data);
              },
              (error) => {
                navigate("/login");
                console.log(error);
              }
            );
          }
          fetchClass();
    }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (formik) => () => {
    console.log("close");
    formik.resetForm();
    setOpen(false);
  };

  useEffect(() => {
    async function fetchClass() {
      console.log("update");
      await http.get("/classes").then(
        (result) => {
          setItems(result.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    fetchClass();
  }, [open]);

  return (
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
        <AddClassForm open={open} handleClose={handleClose} />
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
  );
}

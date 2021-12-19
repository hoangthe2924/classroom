import { useEffect, useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ClassTabs from "components/Class/ClassTabs/ClassTabs";
import { fetchClassDetail, fetchAllClasses } from "services/class.service";
import { Fragment } from "react";
import { useDispatch } from "react-redux";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ClassDetail({changeTitle}) {
  const [item, setItem] = useState([]);
  const [open, setOpen] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cjc = new URLSearchParams(search).get("cjc");
  const strQuery = cjc ? `?cjc=${cjc}` : "";
  let { id } = useParams();

  async function fetchClasses() {
    await fetchAllClasses().then(
      (result) => {
        console.log(result.data);
        dispatch({type: "FETCH", payload: result.data});
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async function fetchClass() {
    await fetchClassDetail(id, strQuery).then(
      (result) => {
        if (result.status === 401) {
          navigate("/login");
        }
        
        const data = result.data;
        if(data?.newMember){
          fetchClasses();
          setOpen(true);
        }

        delete data.newMember;
        setItem(data);

        // return result;
      },
      (error) => {
        navigate("/login");
        console.log(error);
      }
    );
  }

  function handleUpdate() {
    fetchClass();
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetchClass();
    localStorage.removeItem('prev-link');
  }, [id]);

  useEffect(()=>{

    return () => {
      changeTitle("");
    };
  },[]);

  const { className } = item;

  useEffect(()=>{
    changeTitle(className);
  }, [className]);

  return (
    <Fragment>
    <Card variant="outlined">
      <ClassTabs item={item} onUpdate={handleUpdate} />
    </Card>
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Welcome to the class!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

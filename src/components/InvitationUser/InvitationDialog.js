import React, { useState, useRef, Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import UserEmailList from "./UserEmailList";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InvitationDialog = (props) => {
  const [openInvitationDialog, setOpenInvitationDialog] = useState(false);
  const [openSuccessSBar, setOpenSuccessSBar] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [listEmail, setListEmail] = useState([]);
  let emailInput = useRef("");

  const addEmailHandler = (event) => {
    const newEmail = event.target.value;
    const updatedEmailList = [...listEmail].concat(newEmail);
    if (validateEmail(newEmail)&&listEmail.findIndex(email => email===newEmail)<0) {
      setListEmail(updatedEmailList);
      emailInput.current.value = "";
    } else {
      setHasError(true);
    }
  };

  const closeDialogHandler = () => {
    setOpenInvitationDialog(false);
  };

  const openDialogHandler = () => {
    setOpenInvitationDialog(true);
  };


  const closeSuccessBarHandler = () => {
    setOpenSuccessSBar(false);
  }

  return (
    <Fragment>
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={openDialogHandler}
        >
          <PersonAddIcon />
        </IconButton>
      <Dialog
        maxWidth="xs"
        fullWidth="true"
        open={openInvitationDialog}
        onClose={closeDialogHandler}
      >
        <DialogTitle>Invite user</DialogTitle>
        <DialogContent dividers>
          <DialogContentText fontSize='12px'>Enter emails you want to invite</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            inputRef={emailInput}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            error={hasError? true:false}
            helperText={hasError? "Invalid email or duplicate email!":""}
            onChange={hasError? ()=>setHasError(false):()=>{}}
            onKeyPress={(event) => {
              if (event.keyCode === "13" || event.key === "Enter")
                addEmailHandler(event);
            }}
          />
          <Divider />
          <UserEmailList emailList={listEmail} setEmailList={setListEmail} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSuccessSBar} autoHideDuration={6000} onClose={closeSuccessBarHandler}>
        <Alert onClose={closeSuccessBarHandler} severity="success" sx={{ width: '100%' }}>
          Invitation has just been sent!
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default InvitationDialog;

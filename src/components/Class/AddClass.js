import { useEffect, useRef, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';


export default () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let textInput = useRef();  // React use ref to get input value



    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ className: textInput.current.value })
        };
        fetch('https://advanced-web-classroom-api.herokuapp.com/classes/', requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        setOpen(false);
        window.location.reload(false);
    };

    return (
        <Grid item xs={12} sm={12} md={12} textAlign='center'>
            <Button variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleClickOpen}>
                Add New
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add new class, please enter the class name.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        inputRef={textInput}
                        margin="dense"
                        id="className"
                        label="Class Name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );


    return

}
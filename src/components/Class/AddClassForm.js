import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import http from "axios-config";
import { useFormik } from "formik";

export default function AddClassForm({ open, handleClose }) {
  const formik = useFormik({
    initialValues: {
      className: "",
      subject: "",
      description: "",
    },
    onSubmit: async (values) => {
      await http
        .post("/classes/", values)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200 || res.status === 201) {
            handleClose();
            alert("Your question has been submited!");
          } else {
            alert("Please try again later");
          }
        })
        .catch((error) => {
          console.log("err: ", error);
        });
      handleClose(formik)();
    },
  });
  return (
    <div>
      <Dialog open={open} onClose={handleClose(formik)}>
        <DialogTitle>Create New Class</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              autoFocus
              required
              margin="dense"
              id="className"
              name="className"
              label="Class Name"
              type="text"
              value={formik.values.className}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="subject"
              name="subject"
              label="Subject"
              type="text"
              value={formik.values.subject}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose(formik)}>Cancel</Button>
            <Button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

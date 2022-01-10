import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ListItemAvatar, Avatar } from "@mui/material";
import { useFormik } from "formik";
import { createCommentGR } from "services/grade.service";

export default function CommentBox({ assignmentId, onUpdate, gradeReviewId, openLoading }) {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: async (values) => {
      try {
        if (values.comment?.length !== 0) {
          openLoading(true);
          const res = await createCommentGR(
            gradeReviewId,
            assignmentId,
            values.comment
          );
          if (res.data) {
            onUpdate();
            formik.resetForm();
          }
          openLoading(false);
        }
      } catch (error) {
        openLoading(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        px: 1,
      }}
    >
      <ListItemAvatar sx={{ my: "auto" }}>
        <Avatar alt="avatar" />
      </ListItemAvatar>
      <TextField
        fullWidth
        label="Comment"
        placeholder="Hãy nói gì đó..."
        id="comment"
        variant="filled"
        size="small"
        value={formik.values.comment}
        onChange={formik.handleChange}
      />
    </Box>
  );
}

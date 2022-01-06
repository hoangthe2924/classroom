import { Box } from "@mui/material";
import StudentViewGradeDetail from "./utils/StudentViewGradeDetail";
import TeacherViewGradeDetail from "./utils/TeacherViewGradeDetail";

export default function GradeBoard({ items }) {
  const role = items.requesterRole;
  console.log(role);

  const studentId = JSON.parse(localStorage.getItem('mssv'));

  return (
    <Box>
      {(role === "teacher") && <TeacherViewGradeDetail ListAssignment={items.assignments} />}
      {(role === "student") && <StudentViewGradeDetail studentID={studentId} />}
    </Box>
  );
}

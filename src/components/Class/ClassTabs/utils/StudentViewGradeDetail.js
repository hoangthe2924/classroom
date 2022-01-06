import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getStudentGradesDetail } from "services/grade.service";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import SearchGradeDetail from "./SearchGradeDetail";

const calculateTotal = (gradesDetail) => {
  const reducer = (previousValue, currentValue) =>
    previousValue + (currentValue.grade.grade / 10.0) * currentValue.point;
  let total = gradesDetail.reduce(reducer, 0.0);
  return total > 10 ? 10 : Math.round(total * 100) / 100;
};

const StudentViewGradeDetail = ({ studentID }) => {
  const params = useParams();
  const [gradesDetail, setGradesDetail] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [sID, setStudentID] = useState(studentID);
  const [error, setError] = useState({ hasError: false, message: "" });

  const getGradesDetail = async () => {
    const classId = params.id;
    try {
      const res = await getStudentGradesDetail(sID, classId);
      const { fullName, studentId, students } = res.data;
      setGradesDetail(students);
      setError({ hasError: false, message: "" });
      setStudentInfo({ fullName, studentId });
    } catch (error) {
      let err_msg = "Something went wrong!";
      if (
        error.response.data.message &&
        error.response.data.message.length !== 0
      ) {
        err_msg = error.response.data.message;
      }

      setError({ hasError: true, message: err_msg });
      console.log(error);
    }
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && !studentID) {
      isFirstRender.current = false;
    }else{
      getGradesDetail();
    }
  }, [sID]);

  const total = calculateTotal(gradesDetail);

  return (
    <>
      {!studentID && <SearchGradeDetail handleSearch={setStudentID} />}
      {sID && !error.hasError && (
        <>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
          >{`${studentInfo?.studentId} - ${studentInfo?.fullName}`}</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Title</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Point</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Review Request</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gradesDetail.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{`${row.grade.grade}/10`}</TableCell>
                    <TableCell align="right">Nothing</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="body2" component="div" align="right" mx={2} gutterBottom sx={{ fontStyle: "italic", fontWeight: "bolder" }}>
              {`Total: ${total}/10.0`}
            </Typography>
          </TableContainer>
        </>
      )}
      {error.hasError && (
        <Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          color="error.main"
          align="center"
        >
          {error.message}
        </Typography>
      )}
    </>
  );
};

export default StudentViewGradeDetail;

import * as React from "react";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridFilterMenuItem,
  SortGridMenuItems,
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { MenuItem, Grid } from "@mui/material";
import ImportStudentDialog from "components/Class/ClassTabs/ImportDialog/ImportStudentDialog";
import ImportGradeDialog from "components/Class/ClassTabs/ImportDialog/ImportGradeDialog";
import { Link } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from "@mui/icons-material/Save";
import { getStudentList, updateStudentList } from "services/class.service";
import { getStudentGrades, updateStudentGrades } from "services/grade.service";
import CircularProgress from '@mui/material/CircularProgress';

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
  })
);

const StyledGridColumnMenu = styled(GridColumnMenu)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
  })
);

function CustomColumnMenuComponent(props) {
  const { hideMenu, currentColumn, color, rows, setRows,  ...other } = props;
  const [isOpenImportGrade, setIsOpenImportGrade] = useState(false);

  function handleImportGrade() {
    console.log(currentColumn["field"])
    setIsOpenImportGrade(true)
  }

  function updateGrade(rows, grade) {
    var data = rows.slice()
    var checkExist = false
      for (const row of data) {
          if (row.studentId === grade.studentId) {
            checkExist = true
            console.log(currentColumn["field"])
            row[currentColumn["field"]] = grade.grade
            console.log(row)
            break
          }
      }
      if (!checkExist) {
        delete grade.guid
        grade[currentColumn["field"]] = grade.grade
        data.push(grade)
      }
      console.log(data)
      return data
  }

  const handleClose = (value) => {
    setIsOpenImportGrade(false);
    if (value) {
      value.forEach((vl) => {
        setRows((prevrows) => updateGrade(prevrows, vl));
      });
    }
    console.log("close", value);
  };

  if (currentColumn.field === "name") {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      </StyledGridColumnMenuContainer>
    );
  }
  if (
    currentColumn.field !== "fullName" &&
    currentColumn.field !== "studentId" &&
    currentColumn.field !== "total"
  ) {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <MenuItem onClick={handleImportGrade}>
          Import Grade
        </MenuItem>
        <ImportGradeDialog open={isOpenImportGrade}  onClose={handleClose}/>
      </StyledGridColumnMenuContainer>
    );
  }
  return (
    <StyledGridColumnMenu
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      ownerState={{ color }}
      {...other}
    />
  );
}

CustomColumnMenuComponent.propTypes = {
  color: PropTypes.string.isRequired,
  currentColumn: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

export { CustomColumnMenuComponent };

function CustomToolbar(props) {
  const { handleClickOpen, handleSave } = props;

  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport sx={{ mr: 1, ml: 2 }} csvOptions={{ allColumns: true, utf8WithBom: true }} />
      <Button
        startIcon={<UploadIcon fontSize="small" />}
        sx={{ mr: 1, ml: 2 }}
        onClick={handleClickOpen}
      >
        Import
      </Button>
      <Grid container justifyContent="flex-end">
        <Link
          to="/StudentTemplate.xlsx"
          target="_blank"
          download
          style={{ textDecoration: "none" }}
        >
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Download Student Template
          </Button>
        </Link>
        <Link
          to="/GradingTemplate.xlsx"
          target="_blank"
          download
          style={{ textDecoration: "none" }}
        >
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Download Grade Template
          </Button>
        </Link>
      </Grid>

    </GridToolbarContainer>
  );
}
export { CustomToolbar };


export default function StudentList(props) {
  const params = useParams();
  const navigate = useNavigate();
  const { items } = props;
  const assignments = items.assignments;
  const [color, setColor] = React.useState("primary");

  const [rows, setRows] = useState([]);
  const [isOpenImportStudent, setIsOpenImportStudent] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);

  const [selectedValue, setSelectedValue] = useState([]);
  var requestCount = 0

  useEffect(() => {
    function addGrades(grades, rows) {
      var data = rows.slice()
      for (const row of data) {
        for (const grade of grades) {
          if (row.id === grade.studentIdFk) {
            row[grade.assignmentId] = grade.grade
          }
        }
      } 
      return data
    }
    async function getAssignmentGrades(assignmentId, classId) {
      const res = await getStudentGrades(assignmentId, classId)
      let grades = res.data ? res.data : [];
      setRows((prevState) => addGrades(grades, prevState))
    }
    async function fetchStudentList() {
      const res = await getStudentList(params.id);
      var data = res.data ? res.data : [];
      setRows(data);
      for (const assignment of assignments) {
        getAssignmentGrades(assignment.id.toString(), params.id)
      }
    }
    if (params) {
      fetchStudentList();
    } else {
      navigate("/", { replace: true });
    }
  }, [params, navigate]);

  const handleClickOpen = () => {
    setIsOpenImportStudent(true);
    setSelectedValue([]);
  };

  const handleSave = async () => {
    setIsSavingData(true)
    const body = { studentList: [...apiRef.current?.getRowModels().values()] } || { studentList: null };
    const res = await updateStudentList(params.id, body);
    var data = res.data ? res.data : [];
    var count = 0;
    async function updateGradeAsync(assignmentId, body, classId) {
      const res = await updateStudentGrades(assignmentId, body, classId)
      count += 1
      console.log(assignments.length)
      if (count === assignments.length)
      {
        setIsSavingData(false)
      }
    }
    assignments.forEach(
      (assignment) => {
        updateGradeAsync(assignment.id.toString(), body, params.id)
      }
    );
  };

  const handleClose = (value) => {
    setIsOpenImportStudent(false);
    setSelectedValue(value);
    if (value) {
      value.forEach((vl) => {
        setRows((prevrows) => [...prevrows, vl]);
      });
    }
    console.log("close", value);
  };

  function getTotal(params) {
    let total = 0;
    let totalPoint = 0;
    let totalFactor = 0;
    assignments.forEach(
      (assignment) => {
        totalPoint += params.row[assignment.id.toString()] * assignment.point || 0
        totalFactor += assignment.point || 0
      }
    );
    total = totalPoint / totalFactor
    return total;
  }

  const columns = [
    { field: "studentId", headerName: "Student ID", flex: 1.0 },
    { field: "fullName", headerName: "Full Name", flex: 1.0, minWidth: 150 },
  ];
  assignments.forEach((assignment) => {
    columns.push({
      field: assignment.id.toString(),
      headerName: assignment.title,
      editable: true,
      type: "number",
      flex: 1.0,
    });
  });
  columns.push({
    field: "total",
    headerName: "Total",
    flex: 1.0,
    valueGetter: getTotal,
  });

  function useApiRef() {
    const apiRef = useRef(null);
    const _columns = useMemo(
      () =>
        columns.concat({
          field: "__HIDDEN__",
          width: 0,
          disableExport: true,
          // hide: true,
          renderCell: (params) => {
            apiRef.current = params.api;
            return null;
          },
        }),
      [columns]
    );
    return { apiRef, columns: _columns };
  }

  const { apiRef, columns: columns2 } = useApiRef();

  const handleClickButton = () => {
    console.log([...apiRef.current?.getRowModels().entries()] || "empty");
    const res = [...apiRef.current?.getRowModels().values()];
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div style={{ width: "100%", marginTop: 16 }}>
        <DataGrid
          autoHeight
          columns={columns2}
          rows={rows}
          components={{
            ColumnMenu: CustomColumnMenuComponent,
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            columnMenu: { color, rows, setRows },
            toolbar: { handleClickOpen, handleSave },
          }}
        />
      </div>
      <Grid container justifyContent="flex-start">
        <Button onClick={handleClickButton}>Show data</Button>

      </Grid>
      <Grid container justifyContent="flex-end">
        {isSavingData ? (<CircularProgress />) : (
          <>
          <Button
          startIcon={<SaveIcon fontSize="small" />}
          sx={{ mr: 1 }}
          onClick={handleSave}
        >
          Save
        </Button>
          </>
        ) }
        
      </Grid>

      <ImportStudentDialog open={isOpenImportStudent} onClose={handleClose} />
    </div>
  );
}

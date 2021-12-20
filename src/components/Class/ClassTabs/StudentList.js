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
import { MenuItem, Grid, Box, Tooltip } from "@mui/material";
import ImportDialog from "components/Class/ClassTabs/ImportDialog/ImportDialog";
import { Link } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import SaveIcon from "@mui/icons-material/Save";
import { getStudentList, updateStudentList } from "services/class.service";
import Typography from "@mui/material/Typography";
import AnchorElTooltips from "./utils/AnchorElTooltips";

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
  const { hideMenu, currentColumn, color, ...other } = props;

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
        <MenuItem onClick={() => console.log(currentColumn["field"])}>
          Import Grade
        </MenuItem>
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
      <GridToolbarExport
        sx={{ mr: 1, ml: 2 }}
        csvOptions={{ allColumns: true, utf8WithBom: true }}
      />
      <Button
        startIcon={<UploadIcon fontSize="small" />}
        sx={{ mr: 1, ml: 2 }}
        onClick={handleClickOpen}
      >
        Import
      </Button>
      <Grid container justifyContent="flex-end">
        <Link
          to="/StudentList.xlsx"
          target="_blank"
          download
          style={{ textDecoration: "none" }}
        >
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Download Template
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
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);

  useEffect(() => {
    async function fetchStudentList() {
      const res = await getStudentList(params.id);
      const data = res.data ? res.data : [];
      setRows(data);
    }

    if (params) {
      fetchStudentList();
    } else {
      navigate("/", { replace: true });
    }
  }, [params, navigate]);

  const handleClickOpen = () => {
    setOpen(true);
    setSelectedValue([]);
  };

  const handleSave = async () => {
    const body = { studentList: rows };
    const res = await updateStudentList(params.id, body);
    // newItem.id = res.data.id;
    // const newItems = items.concat(newItem);
    console.log("resSave", res);
    setRows(res.data);
  };

  const handleClose = (value) => {
    setOpen(false);
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
    assignments.forEach(
      (assignment) => (total += params.row[assignment.id.toString()] || 0)
    );
    return total;
  }

  const columns = [
    {
      field: "studentId",
      headerName: "Student ID",
      flex: 1.0,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1.0,
      minWidth: 150,
      renderCell: (params) => {
        console.log(params.value);
        if (params.value.extra) {
          return (
            <AnchorElTooltips title={params.value.extra.fullname} content={params.value.val} color="#e8586e"/>
          );
        } else {
          return <Typography>{params.value.val}</Typography>;
        }
      },
    },
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
            columnMenu: { color },
            toolbar: { handleClickOpen, handleSave },
          }}
        />
      </div>
      <Grid container justifyContent="flex-start">
        <Button onClick={handleClickButton}>Show data</Button>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Button
          startIcon={<SaveIcon fontSize="small" />}
          sx={{ mr: 1 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Grid>

      <ImportDialog open={open} onClose={handleClose} />
    </div>
  );
}

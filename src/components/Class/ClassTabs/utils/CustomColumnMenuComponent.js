import { useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { updateFinalize } from "services/grade.service";
import { MenuItem } from "@mui/material";
import ImportGradeDialog from "components/Class/ClassTabs/ImportDialog/ImportGradeDialog";

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
  const {
    hideMenu,
    currentColumn,
    color,
    rows,
    setRows,
    assignments,
    setAssignments,
    ...other
  } = props;
  const [isOpenImportGrade, setIsOpenImportGrade] = useState(false);
  const params = useParams();

  function handleImportGrade() {
    setIsOpenImportGrade(true);
  }

  async function handleFinalize() {
    setAssignments((assignments) => {
      let newAssignments = assignments.slice();
      for (const assignment of newAssignments) {
        if (assignment.id.toString() === currentColumn["field"]) {
          assignment.finalize = !assignment.finalize;
          break;
        }
      }
      return newAssignments;
    });
    await updateFinalize(currentColumn["field"], params.id);
  }

  function updateGrade(rows, grade) {
    var data = rows.slice();
    var checkExist = false;
    for (const row of data) {
      if (row.studentId === grade.studentId) {
        checkExist = true;
        row[currentColumn["field"]] = grade.grade;
        break;
      }
    }
    if (!checkExist) {
      delete grade.guid;
      grade[currentColumn["field"]] = grade.grade;
      data.push(grade);
    }
    return data;
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
        sx={{}}
        {...other}
      >
        <MenuItem onClick={handleImportGrade}>Import Grade</MenuItem>
        <MenuItem onClick={handleFinalize}>Mark as Finalize</MenuItem>
        <ImportGradeDialog open={isOpenImportGrade} onClose={handleClose} />
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
export default CustomColumnMenuComponent;

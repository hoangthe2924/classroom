import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridFilterMenuItem,
  SortGridMenuItems,
  DataGrid,
} from "@mui/x-data-grid";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

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
  if (currentColumn.field === "stars") {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <Box
          sx={{
            width: 127,
            height: 160,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StarOutlineIcon sx={{ fontSize: 80 }} />
        </Box>
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

export default function CustomColumnMenu(props) {
  const { items } = props;
  console.log("as", items);
  const [color, setColor] = React.useState("primary");
  let columns = [
    { field: "studentId", headerName: "Student ID", width: 150 },
    { field: "fullName", headerName: "Full Name", width: 150 },
  ];
  items.assignments.forEach((assignment) => {
    columns.push({
      field: assignment.id.toString(),
      headerName: assignment.title,
      editable: true,
      type: "number",
    });
  });
  columns.push({
    field: "total",
    headerName: "Total",
  });
  console.log("as", columns);

  const rows = [
    {
      id: 1,
      studentId: "Open source",
      fullName: "MUI",
    },
    {
      id: 2,
      studentId: "Enterprise",
      fullName: "DataGrid",
    },
  ];
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div style={{ height: 250, width: "100%", marginTop: 16 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          components={{
            ColumnMenu: CustomColumnMenuComponent,
          }}
          componentsProps={{
            columnMenu: { color },
          }}
        />
      </div>
    </div>
  );
}

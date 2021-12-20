import * as React from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import GradeStructure from "components/Class/ClassTabs/GradeStructure";
import { Grid } from "@mui/material";

export default function OverviewTab({ item, onChangeTab }) {

  return (
    <div>
      <CardContent
        style={{
          backgroundImage: `url("https://www.gstatic.com/classroom/themes/img_backtoschool.jpg")`,
          marginBottom: "10px",
          height: "150px",
          backgroundPosition: "center",
        }}
      >
        <Typography variant="h5" color="text.primary" gutterBottom>
          <strong> Class Name:</strong> {item.className}
        </Typography>
        <Typography variant="body1" color="text.primary">
          <strong>Subject:</strong> {item.subject}
        </Typography>
        <Typography variant="body1" color="text.primary">
          <strong>Description:</strong> {item.description}
        </Typography>
      </CardContent>
      <Grid container spacing={2} marginTop="10px">
        <Grid item xs={3} md={3}>
          <GradeStructure item={item} onChangeTab={onChangeTab} />
        </Grid>
        <Grid item xs={9} md={9}></Grid>
      </Grid>
    </div>
  );
}

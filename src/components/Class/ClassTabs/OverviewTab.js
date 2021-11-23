import * as React from "react";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export default function OverviewTab({ item }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CardContent>
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
  );
}

import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./infoBox.css";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox_card">
      <CardContent>
        <Typography color="textSecondary" className="infoBox_title">
          {title}
        </Typography>
        <h2 className="infoBox_cases">{cases}</h2>
        <Typography color="textSecondary" className="infoBox_total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;

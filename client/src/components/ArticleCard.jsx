import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const ArticleCard = ({ category, title, author, date, image }) => (
  <Card className="shadow-sm h-100">
    <CardMedia component="img" height="180" image={image} alt={title} />
    <CardContent>
      <Typography variant="caption" color="primary" fontWeight="bold">
        {category}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {author} - {date}
      </Typography>
    </CardContent>
  </Card>
);

export default ArticleCard;

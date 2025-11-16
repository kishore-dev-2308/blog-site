import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const ArticleCard = ({ category, title, author, date, image }) => (
  <Card
    sx={{
      position: "relative",
      overflow: "hidden",
      borderRadius: 3,
      cursor: "pointer",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
      },
    }}
  >
    <Box sx={{ position: "relative", overflow: "hidden" }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        // onError={(e) => {
        //   e.target.src =
        //     "./public/placeholder.svg";
        // }}
        alt={title}
        sx={{
          transition: "transform 0.6s ease",
          "&:hover": { transform: "scale(1.1)" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4))",
          opacity: 0,
          transition: "opacity 0.5s ease",
          "&:hover": { opacity: 1 },
        }}
      />
    </Box>
    <CardContent>
      <Typography variant="caption" color="primary" fontWeight="bold">
        {category}
      </Typography>
      <Typography
        variant="h6"
        title={title}
        sx={{
          fontWeight: "bold",
          mt: 1,
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {author} - {date}
      </Typography>
    </CardContent>
  </Card>
);

export default ArticleCard;

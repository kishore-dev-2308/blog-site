import React from "react";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";

const TrendingPosts = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h6" fontWeight={700} gutterBottom>
      Trending Posts
    </Typography>
    <List>
      {[
        "The Quantum Leap in Computing",
        "Minimalism in Digital Design",
        "How to Build a Startup with No-Code Tools",
        "The Psychology of Color in Branding",
      ].map((title, i) => (
        <ListItem key={i} disablePadding sx={{ mb: 2 }}>
          <Typography variant="h6" color="primary" sx={{ width: 30 }}>
            {`0${i + 1}`}
          </Typography>
          <ListItemText
            primary={title}
            secondary={["Technology", "Design", "Business", "Design"][i]}
            sx={{ ml: 2 }}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default TrendingPosts;

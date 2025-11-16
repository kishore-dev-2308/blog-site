import React from "react";
import { Grid, Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";

const articles = [
  {
    category: "Technology",
    title: "Mastering Modern Web Design",
    author: "John Smith",
    date: "Oct 25",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTvBndFKg9ZbpXNy8CWS4WrKMlxRBXkxAXvLdoIvDXx-oZFGYfdanCIrEM5knWYrZA4HtYaznTDSZyXBS5xXyvBipjXhDmh6lrJx7DrBwc2INHwcuiXrinBxDN6NLJNvlGroK9nH7EstJaUcAunS6zRmD7_j2PubCGDyoL_6SaYczOYRMErk0v_SZJrODxrPpTOf74qZX4tbl7bponoE5Zr0wXJ10js_iV8M0o3y0sH4jyjwfqJLrlX5NP02qVEtg2bXKvnO1mQc4",
  },
  {
    category: "Technology",
    title: "Mastering Modern Web Design",
    author: "John Smith",
    date: "Oct 25",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTvBndFKg9ZbpXNy8CWS4WrKMlxRBXkxAXvLdoIvDXx-oZFGYfdanCIrEM5knWYrZA4HtYaznTDSZyXBS5xXyvBipjXhDmh6lrJx7DrBwc2INHwcuiXrinBxDN6NLJNvlGroK9nH7EstJaUcAunS6zRmD7_j2PubCGDyoL_6SaYczOYRMErk0v_SZJrODxrPpTOf74qZX4tbl7bponoE5Zr0wXJ10js_iV8M0o3y0sH4jyjwfqJLrlX5NP02qVEtg2bXKvnO1mQc4",
  },
  {
    category: "Technology",
    title: "Mastering Modern Web Design",
    author: "John Smith",
    date: "Oct 25",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTvBndFKg9ZbpXNy8CWS4WrKMlxRBXkxAXvLdoIvDXx-oZFGYfdanCIrEM5knWYrZA4HtYaznTDSZyXBS5xXyvBipjXhDmh6lrJx7DrBwc2INHwcuiXrinBxDN6NLJNvlGroK9nH7EstJaUcAunS6zRmD7_j2PubCGDyoL_6SaYczOYRMErk0v_SZJrODxrPpTOf74qZX4tbl7bponoE5Zr0wXJ10js_iV8M0o3y0sH4jyjwfqJLrlX5NP02qVEtg2bXKvnO1mQc4",
  },
  {
    category: "Technology",
    title: "Mastering Modern Web Design",
    author: "John Smith",
    date: "Oct 25",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTvBndFKg9ZbpXNy8CWS4WrKMlxRBXkxAXvLdoIvDXx-oZFGYfdanCIrEM5knWYrZA4HtYaznTDSZyXBS5xXyvBipjXhDmh6lrJx7DrBwc2INHwcuiXrinBxDN6NLJNvlGroK9nH7EstJaUcAunS6zRmD7_j2PubCGDyoL_6SaYczOYRMErk0v_SZJrODxrPpTOf74qZX4tbl7bponoE5Zr0wXJ10js_iV8M0o3y0sH4jyjwfqJLrlX5NP02qVEtg2bXKvnO1mQc4",
  },
  {
    category: "Technology",
    title: "Mastering Modern Web Design",
    author: "John Smith",
    date: "Oct 25",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTvBndFKg9ZbpXNy8CWS4WrKMlxRBXkxAXvLdoIvDXx-oZFGYfdanCIrEM5knWYrZA4HtYaznTDSZyXBS5xXyvBipjXhDmh6lrJx7DrBwc2INHwcuiXrinBxDN6NLJNvlGroK9nH7EstJaUcAunS6zRmD7_j2PubCGDyoL_6SaYczOYRMErk0v_SZJrODxrPpTOf74qZX4tbl7bponoE5Zr0wXJ10js_iV8M0o3y0sH4jyjwfqJLrlX5NP02qVEtg2bXKvnO1mQc4",
  },
  {
    category: "Technology",
    title: "Mastering Modern Web Design",
    author: "John Smith",
    date: "Oct 25",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTvBndFKg9ZbpXNy8CWS4WrKMlxRBXkxAXvLdoIvDXx-oZFGYfdanCIrEM5knWYrZA4HtYaznTDSZyXBS5xXyvBipjXhDmh6lrJx7DrBwc2INHwcuiXrinBxDN6NLJNvlGroK9nH7EstJaUcAunS6zRmD7_j2PubCGDyoL_6SaYczOYRMErk0v_SZJrODxrPpTOf74qZX4tbl7bponoE5Zr0wXJ10js_iV8M0o3y0sH4jyjwfqJLrlX5NP02qVEtg2bXKvnO1mQc4",
  }
];

const LatestArticles = () => (
  <div className="pt-4">
    <Typography variant="h5" fontWeight={700} gutterBottom>
      Latest Articles
    </Typography>
    <Grid container spacing={5} >
      {articles.map((a, i) => (
        <Grid item size={{ xs: 12, sm: 6, md: 4 }}>
          <ArticleCard {...a} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default LatestArticles;

import { Breadcrumbs, Typography, Link as MUILink, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function BreadcrumbsTrail({ items = [], sx = {} }) {
  return (
    <Box sx={{ mb: 2, ...sx }}>
      <Breadcrumbs separator="›" sx={{ fontSize: "0.95rem" }}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast) {
            return (
              <Typography key={index} color="text.primary" fontWeight={600}>
                {item.label}
              </Typography>
            );
          }

          return (
            <MUILink
              key={index}
              component={Link}
              to={item.href}
              underline="hover"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              {item.label}
            </MUILink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/admin");
  const isAuthor = location.pathname.startsWith("/author");

  const title = isAdmin
    ? "Admin Page Not Found"
    : isAuthor
    ? "Author Page Not Found"
    : "Page Not Found";

  const description = isAdmin
    ? "This admin page does not exist."
    : isAuthor
    ? "This author page does not exist."
    : "The page you are looking for does not exist.";

  const goHome = () => {
    if (isAdmin) navigate("/admin");
    else if (isAuthor) navigate("/author");
    else navigate("/");
  };

  return (
    <Box
      height="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h2" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h5" mt={1}>
        {title}
      </Typography>

      <Typography color="text.secondary" mt={1} mb={3}>
        {description}
      </Typography>

      <Button variant="contained" onClick={goHome}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default NotFound;

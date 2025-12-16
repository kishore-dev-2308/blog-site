import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ServerError = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/admin");
  const isAuthor = location.pathname.startsWith("/author");

  const goBack = () => {
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
        500
      </Typography>

      <Typography variant="h5" mt={1}>
        Something went wrong
      </Typography>

      <Typography color="text.secondary" mt={1} mb={3}>
        Internal server error. Please try again later.
      </Typography>

      <Button variant="contained" onClick={goBack}>
        Go Back
      </Button>
    </Box>
  );
};

export default ServerError;

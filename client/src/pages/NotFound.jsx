import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100 text-center">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h4 className="mb-3">Oops! Page not found 😢</h4>
      <p className="text-muted mb-4">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary rounded-pill px-4">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-centert px-3">
      <h1 className="display-1 fw-bold text-danger">500</h1>
      <h4 className="mb-3">Something went wrong 😞</h4>
      <p className="text-muted mb-4">
        It looks like our server is having trouble. Please try again later or contact support.
      </p>
      <div className="d-flex flex-column flex-sm-row gap-3">
        <Link to="/" className="btn btn-primary rounded-pill px-4">
          Go Back Home
        </Link>
        <Link to="/contact" className="btn btn-outline-secondary rounded-pill px-4">
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default ServerError;

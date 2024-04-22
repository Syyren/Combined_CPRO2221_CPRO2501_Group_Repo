import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NoAccess = () => {
  return (
    <Layout>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h2>You must be logged in to access this page.</h2>
          <p>Please login or create an account.</p>
        </div>
        <div>
          <Link to="/login">
            <button className="btn btn-secondary mb-2 me-2">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-secondary mb-2">Create Account</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NoAccess;

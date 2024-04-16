import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    //home page after logout
    navigate("/home");
  };

  const handleCancel = () => {
    //previous page on cancel
    window.history.back();
  };

  return (
    <Layout>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h2 className="display-3 mb-2 text-center">Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="container col-md-2 mb-2">
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="container col-md-2">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Layout>
  );
}
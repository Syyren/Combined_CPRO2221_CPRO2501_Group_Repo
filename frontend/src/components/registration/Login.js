import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Layout from "../Layout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login({ username, password });
      navigate("/home");
    } catch (error) {
      if (error.response) {
        console.error("Login error details:", error.response);
        setError(
          `Login failed: ${
            error.response.data.message ||
            error.response.statusText ||
            "Unknown error"
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Check network connection.");
      } else {
        console.error("Error setting up login request:", error.message);
        setError("Error setting up login request.");
      }
    }
  };

  return (
    <Layout>
      <div className="d-flex flex-column text-center justify-content-center align-items-center mt-5">
        <h1 className="display-4 text-center mb-3">Login, Cool Cat!</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            {error && (
              <div className="alert alert-danger mt-2" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Layout from "../Layout";
import { Form, Button, Alert } from "react-bootstrap";

/**
 * Component for user login with form and authentication.
 * @returns {React.Component} A component that renders the login form.
 */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the form submission and attempts to authenticate the user.
   * @param {Object} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await login({ username, password });
      navigate("/home");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message ||
          error.response.statusText ||
          "Unknown error"
        : error.request
        ? "No response from server. Check network connection."
        : "Error setting up login request.";
      console.error("Login error details:", error);
      setError(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <Layout>
      <div className="homePageContainer d-flex flex-column justify-content-center">
        <div className="d-flex flex-column text-center justify-content-center align-items-center mt-5">
          <h1 className="display-4 text-center mb-5">Login, Cool Cat!</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="col-12 col-md-6">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn btn-primary btn-block">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

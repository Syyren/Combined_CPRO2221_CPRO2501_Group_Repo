import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../../controllers/PlayerController";
import Layout from "../../components/Layout";
import {
  validateUsername,
  validatePassword,
  validateEmail,
  validateConfirmPassword,
} from "../../services/validation";

/**
 * Component for player registration with form validations.
 * @returns {React.Component} A component that renders the player registration form.
 */
const PlayerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles form data changes and updates state.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Validates a field based on the input name and value.
   * @param {string} name - The name of the field to validate.
   * @param {string} value - The value of the field to validate.
   * @returns {string} An error message if validation fails, otherwise an empty string.
   */
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return !value.trim() ? "First name is required." : "";
      case "username":
        return validateUsername(value);
      case "email":
        return validateEmail(value);
      case "password":
        return validatePassword(value);
      case "confirm_password":
        return validateConfirmPassword(value, formData.password);
      default:
        return "";
    }
  };

  /**
   * Handles form submission, including validation and registration.
   * @param {Object} event - The event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formErrors = Object.values(formData)
        .map((field) => validateField(field, formData[field]))
        .some((error) => error);
      if (!formErrors) {
        try {
          await register(formData);
          navigate("/login");
        } catch (error) {
          setError("Registration failed. Please try again.");
        }
      }
    }
    setValidated(true);
  };

  return (
    <Layout title="Player Registration">
      <h2 className="display-3 mb-4 text-center">Register, Cool Cat!</h2>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="col-md-6">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {[
              "firstName",
              "username",
              "email",
              "password",
              "confirm_password",
            ].map((field) => (
              <Form.Group className="mb-3" controlId={`form${field}`}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")}
                </Form.Label>
                <Form.Control
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  isInvalid={!!validateField(field, formData[field])}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {validateField(field, formData[field])}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default PlayerRegistration;

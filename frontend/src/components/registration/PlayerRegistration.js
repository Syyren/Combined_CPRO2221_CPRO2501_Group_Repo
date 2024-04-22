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

const PlayerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    securityQuestion: "", 
    securityAnswer: "", 
  });
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      case "securityQuestion":
        return !value.trim() ? "Security question is required." : "";
      case "securityAnswer":
        return !value.trim() ? "Security answer is required." : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formErrors = Object.keys(formData).map((field) =>
        validateField(field, formData[field])
      ).some((error) => error);
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
                  isInvalid={formData[field] && !!validateField(field, formData[field])}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {validateField(field, formData[field])}
                </Form.Control.Feedback>
              </Form.Group>
            ))}
            <Form.Group className="mb-3" controlId="formSecurityQuestion">
              <Form.Label>Security Question</Form.Label>
              <Form.Select
                name="securityQuestion"
                value={formData.securityQuestion || ""}
                onChange={handleChange}
                isInvalid={formData.securityQuestion && !!validateField("securityQuestion", formData.securityQuestion)}
                required
              >
                <option value="">Select a security question</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validateField("securityQuestion", formData.securityQuestion)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSecurityAnswer">
              <Form.Label>Security Answer</Form.Label>
              <Form.Control
                type="text"
                name="securityAnswer"
                value={formData.securityAnswer || ""}
                onChange={handleChange}
                isInvalid={formData.securityAnswer && !!validateField("securityAnswer", formData.securityAnswer)}
                required
              />
              <Form.Control.Feedback type="invalid">
                {validateField("securityAnswer", formData.securityAnswer)}
              </Form.Control.Feedback>
            </Form.Group>
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

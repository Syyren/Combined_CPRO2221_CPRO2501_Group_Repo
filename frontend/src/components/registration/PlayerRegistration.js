import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { register } from "../../controllers/PlayerController";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateConfirmPassword,
} from "../../services/validation";

const PlayerRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleValidation(name, value);
  };

  const handleValidation = (name, value) => {
    let errorMsg = null;
    switch (name) {
      case "firstName":
        if (!value.trim()) errorMsg = "First name is required.";
        break;
      case "username":
        errorMsg = validateUsername(value);
        break;
      case "email":
        errorMsg = validateEmail(value);
        break;
      case "password":
        errorMsg = validatePassword(value);
        if (
          !errorMsg &&
          formData.confirmPassword &&
          value !== formData.confirmPassword
        ) {
          errorMsg = "Passwords do not match.";
        }
        break;
      case "confirmPassword":
        errorMsg = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      Object.values(errors).some((err) => err !== null)
    ) {
      event.stopPropagation();
    } else {
      try {
        await register(formData);
        navigate("/login");
      } catch (error) {
        setErrors({
          ...errors,
          form: "Registration failed. Please try again.",
        });
      }
    }
    setValidated(true);
  };

  return (
    <Layout title="Player Registration">
      <h2 className="display-3 mb-4 text-center">Register, Cool Cat!</h2>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="col-md-6">
          {errors.form && <Alert variant="danger">{errors.form}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {[
              "firstName",
              "username",
              "email",
              "password",
              "confirmPassword",
            ].map((field) => (
              <Form.Group className="mb-3" controlId={`form${field}`}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() +
                    field
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  *
                </Form.Label>
                <Form.Control
                  type={field.includes("Password") ? "password" : field}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  isInvalid={!!errors[field]}
                  required
                />
                {errors[field] && (
                  <Form.Control.Feedback type="invalid">
                    {errors[field]}
                  </Form.Control.Feedback>
                )}
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

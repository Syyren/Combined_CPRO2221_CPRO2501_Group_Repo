import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { register, handleForgotPassword, handleSecurityQnA,handleSetNewPassword   } from "../../controllers/PlayerController";
import Layout from "../Layout";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

/**
 * Component for user login with form and authentication.
 * @returns {React.Component} A component that renders the login form.
 */
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false); 
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showSetPasswordModal, setShowSetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShowForgotPasswordModal(false);

  const handleShow = () => setShowForgotPasswordModal(true);

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
          "incorrect username or password"
        : error.request
        ? "No response from server. Check network connection."
        : "Error setting up login request.";
      console.error("incorrect username or password", error);
      setError(`Login failed: ${errorMessage}`);
    }
  };

  // Inside the handleSubmit function in your Login component
  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await handleForgotPassword(email);
      if (response) {

        setShowForgotPasswordModal(false);
        setShowSecurityModal(true);
      } else {
        alert("No account found with this email address.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Failed to recover password. Please try again.");
    }
  };

   // Function to handle opening the security question modal
   const handleSecurityModal = () => {
    setShowSecurityModal(true);
  };

  // Function to handle submitting the security question and answer
  const handleSecurityQuestion = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await handleSecurityQnA(email, securityQuestion, answer);
      if (response ) {
        // Security question and answer match an account
        setShowSecurityModal(false);
        setShowSetPasswordModal(true);
      } else {
        // Incorrect security question or answer
        alert("Incorrect security question or answer.");
      }
    } catch (error) {
      console.error("Failed to verify security question and answer", error);
      setError("Failed to verify security question and answer. Please try again.");
    }
  };
  

// Function to handle opening the "Set Password" modal
const handleShowSetPasswordModal = () => {
  setShowSetPasswordModal(true);
};

// Function to handle submitting the new password
const handleSetPassword = async (event) => {
  event.preventDefault();
  setError(""); 
  try {
    const response = await handleSetNewPassword(email, newPassword, setError); // Pass setError here
    if (response) {
      setShowSetPasswordModal(false);
      navigate("/home");
    } else {
      alert("Failed to set new password.");
    }
  } catch (error) {
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
                  type={visible ? "password" : "text"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                 <button className="btn btn-outline-secondary" type="button" onClick={() => setVisible(!visible)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </button>
              </Form.Group>
              <Button type="submit" className="btn btn-primary btn-block">
                Login
              </Button>
              <p className="mt-3">
                <a variant="link" style={{ color:"red", cursor:"help" }} onClick={handleShow}>
                  Forgot Password?</a>
              </p>
            </Form>
          </div>
        </div>
      </div>
       {/* Modal for Forgot Password */}
       <Modal show={showForgotPasswordModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recover Account Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForgotPasswordSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
              <Form.Text className="text-muted">Enter the email address associated with your account</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="btn btn-primary btn-lg btn-block">
              Recover Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Security Question Modal */}
      {showSecurityModal && (
        <div className="modal fade show" style={{ display: 'block', zIndex: '1050' }} tabIndex="-1" role="dialog" aria-labelledby="securityQuestionModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <div className="modal-header d-flex justify-content-between">
                    <h5 className="modal-title" id="securityQuestionModalLabel">Security Question & Answer</h5>
                      <button type="button" className="close" onClick={() => setShowSecurityModal(false)} aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="securityQuestion">Select your account security question</label>
                        <select className="form-control" id="securityQuestion" value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)} required >
                          <option value="">Select your account security question</option>
                          <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                          <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                        </select>
                      </div>
                      <br></br>
                      <div className="form-group">
                        <label htmlFor="answer">Answer your account security question</label>
                        <input type="text" className="form-control" id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
                      </div>
                    </form>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="btn btn-danger" onClick={() => setShowSecurityModal(false)}>Close</button>
                    <button type="button" className="btn btn-success" onClick={handleSecurityQuestion}>Verify</button>
                </div>
            </div>
          </div>
        </div>
      )}


       {/* "Set Password" modal */}
       <Modal show={showSetPasswordModal} onHide={() => setShowSetPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Set New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <button type="button" className="btn btn-danger" onClick={() => setShowSecurityModal(false)}>Close</button>
            <button type="button" className="btn btn-success"  onClick={(event) => handleSetPassword(event, email, newPassword, setError)}>Change Password</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Login;

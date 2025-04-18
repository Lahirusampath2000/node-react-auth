import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6} className="bg-light p-5 rounded-4">
          <div className="w-100" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <div className="text-center mb-5">
              <h1 className="mb-4 display-4">Create Account</h1>
              <p className="text-muted fs-5">Enter your details to register</p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* First Name Input */}
              <Form.Group className="mb-4">
                <Form.Label className="fs-5">First Name</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter first name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Last Name Input */}
              <Form.Group className="mb-4">
                <Form.Label className="fs-5">Last Name</Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Enter last name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Email Input */}
              <Form.Group className="mb-4">
                <Form.Label className="fs-5">Email address</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-4">
                <Form.Label className="fs-5">Password</Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Submit Button */}
              <Button 
                variant="primary" 
                type="submit" 
                size="lg"
                className="w-100 mb-4 py-3 fs-5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span 
                      className="spinner-border spinner-border-sm" 
                      role="status" 
                      aria-hidden="true"
                    ></span>
                    <span className="ms-2">Registering...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Login Link */}
              <div className="text-center">
                <span className="text-muted fs-5">Already have an account? </span>
                <Link to="/login" className="text-decoration-none fs-5 fw-bold">
                  Login here
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
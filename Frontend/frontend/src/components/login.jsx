import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6} className="bg-light p-5 rounded-4">
          <div className="w-100" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <div className="text-center mb-5">
              <h1 className="mb-4 display-4">Welcome Back</h1>
              <p className="text-muted fs-5">Please sign in to continue</p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Email Input */}
              <Form.Group className="mb-4">
                <Form.Label className="fs-5">Email address</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
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
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                />
              </Form.Group>

              {/* Remember Me & Forgot Password */}
              <div className="d-flex justify-content-between mb-4">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="fs-5"
                />
                <Link to="/forgot-password" className="text-decoration-none fs-5">
                  Forgot password?
                </Link>
              </div>

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
                    <span className="ms-2">Logging in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              {/* Registration Link */}
              <div className="text-center">
                <span className="text-muted fs-5">Don't have an account? </span>
                <Link to="/register" className="text-decoration-none fs-5 fw-bold">
                  Register here
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
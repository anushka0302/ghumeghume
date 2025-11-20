import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"; // Uses the same CSS as the login page
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

// NEW: Import icons for the form
import { BsPerson, BsEnvelope, BsLock } from "react-icons/bs";

const Register = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        setLoading(false);
        return;
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
    setLoading(false);
  };

  return (
    <section className="auth-section">
      <Container>
        <Row>
          <Col lg="6" className="m-auto">
            <div className="login-container">
              {/* MODIFIED: Content for registration */}
              <h1>Create Account</h1>
              <p className="login-subtitle">
                Sign up to start your next adventure
              </p>

              <Form onSubmit={handleClick}>
                {/* NEW: Username input group */}
                <FormGroup className="input-group">
                  <BsPerson className="input-icon" />
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    id="userName"
                    onChange={handleChange}
                  />
                </FormGroup>

                {/* NEW: Email input group */}
                <FormGroup className="input-group">
                  <BsEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    id="email"
                    onChange={handleChange}
                  />
                </FormGroup>

                {/* NEW: Password input group */}
                <FormGroup className="input-group">
                  <BsLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={handleChange}
                  />
                </FormGroup>

                <Button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Create Account"}
                </Button>
              </Form>

              {/* MODIFIED: Link to login page */}
              <p className="auth-switch">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
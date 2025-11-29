import React, { useState, useContext,useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Spinner } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css"; // We will replace this CSS
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { Helmet } from 'react-helmet-async'; // ✅ SEO Import

// NEW: Import icons for the form
import { BsEnvelope, BsLock } from "react-icons/bs";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
const location = useLocation();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        setLoading(false);
        return;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      //navigate("/");
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
    setLoading(false);
  };
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // The section now covers the whole page
    <>
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>Login | Ghume Ghume</title>
        <meta name="description" content="Login to your Ghume Ghume account to access your bookings and personalized trekking experiences." />
      </Helmet>

      <section className="auth-section">
        <Container>
          <Row>
            <Col lg="6" className="m-auto">
              {/* This is the new "glass" card */}
              <div className="login-container">
                <h1>Welcome Back</h1>
                <p className="login-subtitle">
                  Login to explore the world with us
                </p>

                <Form onSubmit={handleClick}>
                  {/* New input group with icon */}
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

                  {/* New input group with icon */}
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
                    {loading ? <Spinner size="sm" /> : "Login"}
                  </Button>
                </Form>

                <p className="auth-switch">
                  Don't have an account? <Link to="/register">Create one</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Spinner } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { Helmet } from 'react-helmet-async';
import { BsEnvelope, BsLock, BsEye, BsEyeSlash } from "react-icons/bs"; // ✅ Added Eye Icons
import { GoogleLogin } from '@react-oauth/google'; // ✅ Added Google Login

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Password Toggle State

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // ✅ Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${BASE_URL}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate(location.state?.from || "/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      alert(err.message);
    }
    setLoading(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: { "content-type": "application/json" },
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
      navigate(location.state?.from || "/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
    setLoading(false);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Login | Ghume Ghume</title>
      </Helmet>

      <section className="auth-section">
        <Container>
          <Row>
            <Col lg="6" className="m-auto">
              <div className="login-container">
                <h1>Welcome Back</h1>
                <p className="login-subtitle">Login to explore the world with us</p>

                <Form onSubmit={handleClick}>
                  <FormGroup className="input-group">
                    <BsEnvelope className="input-icon" />
                    <input type="email" placeholder="Email Address" required id="email" onChange={handleChange} />
                  </FormGroup>

                  <FormGroup className="input-group">
                    <BsLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"} // Switches visibility
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                    {/* Ensure this class matches your CSS exactly */}
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </span>
                  </FormGroup>

                  <Button className="auth-btn" type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Login"}
                  </Button>

                  {/* ✅ Google Login Button */}
                  <div className="google-btn-container">
                    <GoogleLogin 
                      onSuccess={handleGoogleSuccess} 
                      onError={() => alert("Google Login Failed")}
                      theme="filled_blue"
                      shape="pill"
                    />
                  </div>
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
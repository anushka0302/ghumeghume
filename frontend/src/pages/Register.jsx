import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Spinner } from "reactstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { Helmet } from 'react-helmet-async';
import { BsPerson, BsEnvelope, BsLock, BsEye, BsEyeSlash } from "react-icons/bs";
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [credentials, setCredentials] = useState({ userName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Visibility State

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // ✅ Handle Google Signup
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        setLoading(false);
        return;
      }
      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login", { state: { from: location.state?.from } });
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <Helmet>
        <title>Create Account | Ghume Ghume</title>
      </Helmet>

      <section className="auth-section">
        <Container>
          <Row>
            <Col lg="6" className="m-auto">
              <div className="login-container">
                <h1>Create Account</h1>
                <p className="login-subtitle">Sign up to start your next adventure</p>

                <Form onSubmit={handleClick}>
                  <FormGroup className="input-group">
                    <BsPerson className="input-icon" />
                    <input type="text" placeholder="Username" required id="userName" onChange={handleChange} />
                  </FormGroup>

                  <FormGroup className="input-group">
                    <BsEnvelope className="input-icon" />
                    <input type="email" placeholder="Email Address" required id="email" onChange={handleChange} />
                  </FormGroup>

                  <FormGroup className="input-group">
                    <BsLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"} // ✅ Password view toggle
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </span>
                  </FormGroup>

                  <Button className="auth-btn" type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Create Account"}
                  </Button>

                  <div className="google-btn-container">
                    <GoogleLogin 
                      onSuccess={handleGoogleSuccess} 
                      onError={() => alert("Google Signup Failed")}
                      text="signup_with"
                      shape="pill"
                    />
                  </div>
                </Form>

                <p className="auth-switch">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Register;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="popup-background">
      <div className="popup-container">
        <p>{message}</p>
        <button onClick={() => navigate('/login')}>Log In</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Popup;

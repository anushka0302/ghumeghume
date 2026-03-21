import React, { useState } from 'react';
import './spinwheel.css';
import { BASE_URL } from './../../utils/config';

// ✅ Define styles OUTSIDE the component to keep the code clean and avoid re-renders
const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
    backgroundColor: '#f9f9f9',
    marginBottom: '5px'
};

const SpinWheel = ({ onClose }) => {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const segments = ['10% OFF', 'FREE PRASAD', 'TRY AGAIN', '5% OFF', 'GIFT BOX', 'BETTER LUCK'];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${BASE_URL}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                setIsFormSubmitted(true);
            } else {
                alert("Something went wrong, please try again.");
            }
        } catch (err) {
            console.log("Error saving lead:", err);
            alert("Server connection failed. Please try later.");
        }
    };

    const spinRow = () => {
        if (spinning || result) return;
        const newRotation = rotation + 1800 + Math.random() * 360;
        setRotation(newRotation);
        setSpinning(true);

        setTimeout(async () => {
            setSpinning(false);
            const actualDeg = newRotation % 360;
            const segmentIndex = Math.floor((360 - actualDeg) / (360 / segments.length)) % segments.length;
            const prizeWon = segments[segmentIndex];
            
            setResult(prizeWon);
            localStorage.setItem('lead_discount', prizeWon);
            console.log(`Lead ${formData.phone} won ${prizeWon}`);
        }, 4000);
    };

    return (
        <div className="spin-wheel-overlay">
            <div className="spin-wheel-container">
                <button className="close-btn" onClick={onClose}>&times;</button>
                
                {!isFormSubmitted ? (
                    <div className="lead-form" style={{ padding: '20px', textAlign: 'center', fontFamily: '"Poppins", sans-serif' }}>
                        <h3 style={{ color: '#ff7043', fontWeight: '700', fontSize: '1.8rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Unlock Your Lucky Discount!
                        </h3>
                        
                        <p style={{ color: '#666', fontSize: '1rem', marginBottom: '25px', lineHeight: '1.5' }}>
                            Enter your details to spin the <br/>
                            <span style={{ color: '#faa935', fontWeight: 'bold' }}>CharDham Lucky Wheel</span>
                        </p>

                        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} style={inputStyle} />
                            <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} style={inputStyle} />
                            <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} style={inputStyle} />
                            
                            <button type="submit" className="spin-button" style={{
                                backgroundColor: '#ff7043', color: 'white', padding: '14px', borderRadius: '8px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 15px rgba(255, 112, 67, 0.3)'
                            }}>
                                SUBMIT TO SPIN
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="wheel-section">
                        <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Good Luck, {formData.name}!</h3>
                        <div className="wheel-wrapper">
                            <div className="wheel-pointer"></div>
                            <div className="main-wheel" style={{ transform: `rotate(${rotation}deg)` }}>
                                {segments.map((seg, i) => (
                                    <div key={i} className="wheel-seg" style={{ '--i': i }}>
                                        <span>{seg}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button className="spin-button mt-4" onClick={spinRow} disabled={spinning || result}>
                                {spinning ? 'Spinning...' : result ? 'Prize Claimed!' : 'SPIN NOW'}
                            </button>
                        </div>
                        {result && (
                            <div className="win-announcement" style={{ textAlign: 'center', marginTop: '20px' }}>
                                <h4>Congratulations!</h4>
                                <p>You won: <strong>{result}</strong></p>
                                <small>Our team will contact you at {formData.phone} with your voucher.</small>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpinWheel;
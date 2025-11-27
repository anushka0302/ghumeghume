import React, { useState, useContext, useEffect, useRef } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

import DateSlots from './DateSlots';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { allTourDates } from '../../assets/data/tourDates';

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_API_KEY;

// ✅ NEW: Define Exchange Rate (You can fetch this from an API ideally, but static works too)
const EXCHANGE_RATE = 86; // 1 USD = 86 INR

const Booking = ({ tour, avgRating, tourId }) => {
  
  const { price, reviews, title, priceGroup } = tour;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // --- State ---
  const [dateMode, setDateMode] = useState('fixed'); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // ✅ NEW: Currency State
  const [currency, setCurrency] = useState('INR'); 

  const dropdownRef = useRef(null);

  // --- Pricing Logic ---
  const isGroupMode = Number(price) === Number(priceGroup);
  const minGuestSize = isGroupMode ? 6 : 1;
  const maxGuestSize = isGroupMode ? 50 : 5; 

  const guestOptions = Array.from(
    { length: maxGuestSize - minGuestSize + 1 }, 
    (_, i) => minGuestSize + i
  );

  const currentTourDates = allTourDates[tourId] || [];

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: minGuestSize,
    bookAt: '' 
  });

  // --- Helper: Currency Formatter ---
  // ✅ NEW: Converts and formats price based on state
  const formatPrice = (amountInINR) => {
    if (currency === 'USD') {
      const val = amountInINR / EXCHANGE_RATE;
      return `$${val.toFixed(2)}`; // e.g. $120.50
    }
    return `₹${amountInINR}`;
  };

  // --- Helper: Get Raw Value for calculations ---
  const getConvertedValue = (amountInINR) => {
    if (currency === 'USD') {
      return Number((amountInINR / EXCHANGE_RATE).toFixed(2));
    }
    return amountInINR;
  };

  // --- Effect: Close dropdown if clicked outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    setBooking(prev => {
      const currentVal = Number(prev.guestSize) || 0;
      if (currentVal < minGuestSize && currentVal !== 0) {
        return { ...prev, guestSize: minGuestSize };
      }
      if (currentVal > maxGuestSize) {
        return { ...prev, guestSize: maxGuestSize };
      }
      return prev;
    });
  }, [minGuestSize, maxGuestSize]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  const handleGuestSelect = (num) => {
    setBooking((prev) => ({ ...prev, guestSize: num }));
    setDropdownOpen(false);
  };

  const handleSlotSelect = (dateString) => {
    setBooking(prev => ({ ...prev, bookAt: dateString }));
  };

  const handleCalendarChange = (date) => {
    setBooking(prev => ({ ...prev, bookAt: date }));
  };

  // --- Payment Calculations (INR Base) ---
  const guestCount = Number(booking.guestSize) || minGuestSize; 
  const serviceFeeINR = 10; // Base INR
  const baseAmountINR = Number(price) * guestCount;
  const subTotalINR = baseAmountINR + serviceFeeINR;
  const gstAmountINR = Math.round(subTotalINR * 0.05);
  const totalAmountINR = subTotalINR + gstAmountINR;
  
  // Calculate Advance (25%) and Due
  const advanceAmountINR = Math.round(totalAmountINR * 0.25); 
  const dueAmountINR = totalAmountINR - advanceAmountINR;

  // ✅ NEW: Dynamic Calculation Variables for Display/Payment
  const totalAmountDisplay = getConvertedValue(totalAmountINR);
  const advanceAmountDisplay = getConvertedValue(advanceAmountINR);
  const dueAmountDisplay = getConvertedValue(dueAmountINR);

  // --- Session Storage ---
  useEffect(() => {
    const savedData = sessionStorage.getItem('tempBookingData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.tourName === title) {
        setBooking((prev) => ({
          ...prev,
          fullName: parsedData.fullName || prev.fullName, 
          phone: parsedData.phone || prev.phone,
          guestSize: parsedData.guestSize,
          bookAt: parsedData.bookAt ? new Date(parsedData.bookAt) : '',
        }));
        if (parsedData.dateMode) setDateMode(parsedData.dateMode);
      }
      sessionStorage.removeItem('tempBookingData'); 
    }
  }, [title, user]); 

  // --- Payment Submission ---
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to confirm your booking details.");
      const tempBookingData = {
        tourName: title,
        guestSize: booking.guestSize,
        phone: booking.phone,
        fullName: booking.fullName,
        dateMode: dateMode,
        bookAt: booking.bookAt,
      };
      sessionStorage.setItem('tempBookingData', JSON.stringify(tempBookingData));
      return navigate("/register", { state: { from: location.pathname } });
    }

    if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
      return alert('Please fill in all information and select a date.');
    }

    if (Number(booking.guestSize) < minGuestSize) {
      return alert(`For this package, the minimum group size is ${minGuestSize}.`);
    }

    let finalDateString = booking.bookAt;
    if (typeof booking.bookAt === 'object') {
        finalDateString = booking.bookAt.toDateString(); 
    }

    try {
      // ✅ UPDATED: Send Amount AND Currency to backend
      const orderRes = await fetch(`${BASE_URL}/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            amount: advanceAmountDisplay, // Send the converted amount
            currency: currency // Send 'INR' or 'USD'
        }), 
      });
      
      const orderData = await orderRes.json();
      if (!orderData.success) return alert("Error creating order");

      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.order.amount, // This comes from backend (ensure backend calculates correctly)
        currency: currency, // ✅ UPDATED: 'INR' or 'USD'
        name: "Ghume Ghume",
        description: `Advance for ${title}`, 
        image: "https://www.ghumeghume.com/static/media/logo.2dd53824f641f46a2885.png", 
        order_id: orderData.order.id, 
        handler: async function (response) {
          const verifyRes = await fetch(`${BASE_URL}/payment/paymentverification`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingDetails: {
                ...booking,
                bookAt: finalDateString, 
                totalAmount: totalAmountDisplay, // Save the converted total
                paidAmount: advanceAmountDisplay, // Save the converted advance
                dueAmount: dueAmountDisplay,
                currency: currency, // Save which currency was used
                paymentStatus: 'Partial', 
              }
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) navigate("/thank-you");
          else alert("Payment Verification Failed.");
        },
        prefill: { name: booking.fullName, email: user.email, contact: booking.phone },
        theme: { color: "#faa935" },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='booking'>
      <div className='booking__top d-flex align-items-center justify-content-between'>
        {/* ✅ UPDATED: Display dynamic price */}
        <h3>{formatPrice(price)} <span>/per person</span></h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className="ri-star-s-fill"></i> {avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>

      <div className='booking__form'>
        
        {/* ✅ NEW: Currency Toggle Switch */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Book Your Adventure</h5>
            <div className="currency-switch" style={{ background: '#eee', padding: '4px', borderRadius: '20px', display:'flex' }}>
                <button 
                    onClick={() => setCurrency('INR')}
                    style={{ 
                        border: 'none', 
                        background: currency === 'INR' ? '#faa935' : 'transparent', 
                        color: currency === 'INR' ? '#fff' : '#333',
                        borderRadius: '15px',
                        padding: '2px 10px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}>INR (₹)</button>
                <button 
                    onClick={() => setCurrency('USD')}
                    style={{ 
                        border: 'none', 
                        background: currency === 'USD' ? '#faa935' : 'transparent', 
                        color: currency === 'USD' ? '#fff' : '#333',
                        borderRadius: '15px',
                        padding: '2px 10px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}>USD ($)</button>
            </div>
        </div>

        <Form className='booking__info-form' onSubmit={handlePayment}>
          <FormGroup>
            <input type='text' placeholder='Full name' id='fullName' required onChange={handleChange} className="custom-input" value={booking.fullName}/>
          </FormGroup>
          <FormGroup>
            <input type='number' placeholder='Phone' id='phone' required onChange={handleChange} className="custom-input" value={booking.phone}/>
          </FormGroup>
          
          <FormGroup>
            <label className="input-label">Group Size (Min: {minGuestSize})</label>
            <div className="custom-dropdown" ref={dropdownRef}>
              <div 
                className={`dropdown-selected ${dropdownOpen ? 'open' : ''}`} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{booking.guestSize} Members</span>
                <i className={`ri-arrow-down-s-line arrow-icon ${dropdownOpen ? 'rotate' : ''}`}></i>
              </div>

              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                {guestOptions.map((num) => (
                  <div 
                    key={num} 
                    className={`dropdown-item ${booking.guestSize === num ? 'active' : ''}`}
                    onClick={() => handleGuestSelect(num)}
                  >
                    {num} Members
                  </div>
                ))}
              </div>
            </div>
          </FormGroup>

          <div className="date-toggle-container">
            <label className={`toggle-option ${dateMode === 'fixed' ? 'active' : ''}`}>
                <input type="radio" name="dateMode" value="fixed" checked={dateMode === 'fixed'} onChange={() => setDateMode('fixed')} />
                Fixed Batches
            </label>
            <label className={`toggle-option ${dateMode === 'custom' ? 'active' : ''}`}>
                <input type="radio" name="dateMode" value="custom" checked={dateMode === 'custom'} onChange={() => setDateMode('custom')} />
                Custom Date
            </label>
          </div>

          {dateMode === 'fixed' ? (
             <div className="date-section">
                <h6>Select a Batch:</h6>
                <DateSlots onDateSelect={handleSlotSelect} slotsData={currentTourDates} />
             </div>
          ) : (
             <FormGroup className="d-flex flex-column date-section">
                <h6>Pick your own date:</h6>
                <DatePicker 
                    selected={typeof booking.bookAt === 'object' ? booking.bookAt : null} 
                    onChange={handleCalendarChange}
                    minDate={new Date()} 
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                    className="custom-input"
                    wrapperClassName="w-100"
                    onKeyDown={(e) => e.preventDefault()} 
                />
             </FormGroup>
          )}
        </Form>      
      </div>
      
      {/* Summary Section - Updated to use formatPrice helper */}
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0 summary-item'>
            <h5>{formatPrice(price)} <i className="ri-close-line"></i> {guestCount} person</h5>
            <span>{formatPrice(baseAmountINR)}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 summary-item'>
            <h5>Service charge</h5>
            <span>{formatPrice(serviceFeeINR)}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 summary-item'>
            <h5>GST (5%)</h5>
            <span>{formatPrice(gstAmountINR)}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 summary-item total-cost'>
            <h5>Total Trip Cost</h5>
            <span>{formatPrice(totalAmountINR)}</span>
          </ListGroupItem>
        </ListGroup>

        <div className="payment-split">
            <div className="split-row highlight">
                <span>Pay Now (25%)</span>
                <span className="amount">{formatPrice(advanceAmountINR)}</span>
            </div>
            <div className="split-row text-muted">
                <span>Pay Later</span>
                <span>{formatPrice(dueAmountINR)}</span>
            </div>
            <small>(50% on Day 1, 50% on Last Day)</small>
        </div>
        
        <Button className='btn primary__btn w-100 mt-4 book-btn' onClick={handlePayment}>
          Book for {formatPrice(advanceAmountINR)}
        </Button>
      </div>
    </div>
  );
}

export default Booking;
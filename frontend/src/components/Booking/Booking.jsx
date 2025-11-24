import React, { useState, useContext, useEffect, useRef } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

import DateSlots from './DateSlots';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../assets/images/logo.png"; 

import { allTourDates } from '../../assets/data/tourDates';

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_API_KEY;

const Booking = ({ tour, avgRating, tourId }) => {
  
  const { price, reviews, title, priceGroup } = tour;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // --- Pricing Logic ---
  const isGroupMode = Number(price) === Number(priceGroup);
  const minGuestSize = isGroupMode ? 6 : 1;

  // --- Generate Options ---
  const maxGuestSize = 50; 
  const guestOptions = Array.from(
    { length: maxGuestSize - minGuestSize + 1 }, 
    (_, i) => minGuestSize + i
  );

  const currentTourDates = allTourDates[tourId] || [];

  // --- State ---
  const [dateMode, setDateMode] = useState('fixed'); 
  // ✅ NEW: State for Custom Dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // ✅ NEW: Ref to close dropdown when clicking outside
  const dropdownRef = useRef(null);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: minGuestSize,
    bookAt: '' 
  });

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

  // --- Effect: Switch Guest Size when Toggle Changes ---
  useEffect(() => {
    setBooking(prev => {
      const currentVal = Number(prev.guestSize) || 0;
      if (currentVal < minGuestSize && currentVal !== 0) {
        return { ...prev, guestSize: minGuestSize };
      }
      return prev;
    });
  }, [minGuestSize]);

  // --- Handler: Input Changes ---
  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ NEW: Handler for Custom Dropdown Selection
  const handleGuestSelect = (num) => {
    setBooking((prev) => ({ ...prev, guestSize: num }));
    setDropdownOpen(false); // Close menu after selection
  };

  // --- Date Handlers ---
  const handleSlotSelect = (dateString) => {
    setBooking(prev => ({ ...prev, bookAt: dateString }));
  };

  const handleCalendarChange = (date) => {
    setBooking(prev => ({ ...prev, bookAt: date }));
  };

  // --- Payment Calculations ---
  const guestCount = Number(booking.guestSize) || minGuestSize; 
  const serviceFee = 10;
  const baseAmount = Number(price) * guestCount;
  const subTotal = baseAmount + serviceFee;
  const gstAmount = Math.round(subTotal * 0.05);
  const totalAmount = subTotal + gstAmount;
  const advanceAmount = Math.round(totalAmount * 0.25); 
  const dueAmount = totalAmount - advanceAmount;

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
      const orderRes = await fetch(`${BASE_URL}/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: advanceAmount }), 
      });
      
      const orderData = await orderRes.json();
      if (!orderData.success) return alert("Error creating order");

      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.order.amount, 
        currency: "INR",
        name: "Ghume Ghume",
        description: `Advance for ${title}`, 
        
        // ✅ UPDATED: Use the public string URL to fix CORS error
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
                totalAmount,
                paidAmount: advanceAmount,
                dueAmount,
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
        <h3>₹{price} <span>/per person</span></h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className="ri-star-s-fill"></i> {avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>

      <div className='booking__form'>
        <h5>Book Your Adventure</h5>
        <Form className='booking__info-form' onSubmit={handlePayment}>
          <FormGroup>
            <input type='text' placeholder='Full name' id='fullName' required onChange={handleChange} className="custom-input" value={booking.fullName}/>
          </FormGroup>
          <FormGroup>
            <input type='number' placeholder='Phone' id='phone' required onChange={handleChange} className="custom-input" value={booking.phone}/>
          </FormGroup>
          
          {/* ✅ CUSTOM MODERN DROPDOWN UI */}
          <FormGroup>
            <label className="input-label">Group Size (Min: {minGuestSize})</label>
            
            <div className="custom-dropdown" ref={dropdownRef}>
              {/* The Box you Click */}
              <div 
                className={`dropdown-selected ${dropdownOpen ? 'open' : ''}`} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{booking.guestSize} Members</span>
                <i className={`ri-arrow-down-s-line arrow-icon ${dropdownOpen ? 'rotate' : ''}`}></i>
              </div>

              {/* The List that Appears */}
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

          {/* Date Mode Pill Toggle */}
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
      
      {/* Summary Section */}
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0 summary-item'>
            <h5>₹{price} <i className="ri-close-line"></i> {guestCount} person</h5>
            <span>₹{baseAmount}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 summary-item'>
            <h5>Service charge</h5>
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 summary-item'>
            <h5>GST (5%)</h5>
            <span>₹{gstAmount}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 summary-item total-cost'>
            <h5>Total Trip Cost</h5>
            <span>₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <div className="payment-split">
            <div className="split-row highlight">
                <span>Pay Now (25%)</span>
                <span className="amount">₹{advanceAmount}</span>
            </div>
            <div className="split-row text-muted">
                <span>Pay Later</span>
                <span>₹{dueAmount}</span>
            </div>
            <small>(50% on Day 1, 50% on Last Day)</small>
        </div>
        
        <Button className='btn primary__btn w-100 mt-4 book-btn' onClick={handlePayment}>
          Book for ₹{advanceAmount}
        </Button>
      </div>
    </div>
  );
}

export default Booking;
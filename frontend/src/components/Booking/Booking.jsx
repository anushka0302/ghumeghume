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

// Exchange Rate (Ideally fetch this from an API)
const EXCHANGE_RATE = 86; // 1 USD = 86 INR

const Booking = ({ tour, avgRating, tourId }) => {
  
  // ✅ Added SUV specific flags to your existing destructuring
  const { price, reviews, title, priceGroup, isSUV, onlineToken, maxGroupSize } = tour;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  // --- State ---
  const [dateMode, setDateMode] = useState(allTourDates[tourId] && allTourDates[tourId].length > 0 ? 'fixed' : 'custom');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currency, setCurrency] = useState('INR'); 

  const dropdownRef = useRef(null);

  // --- Pricing Logic ---
  const isGroupMode = Number(price) === Number(priceGroup);
  
  // ✅ MODIFIED: SUV supports 1-9 people but stays at fixed vehicle price
  const minGuestSize = isSUV ? 1 : (isGroupMode ? 3 : 1);
  const maxGuestSize = isSUV ? 9 : (maxGroupSize || 50);

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
    // ✅ MODIFIED: SUV is always open
    bookAt: isSUV ? 'Anytime / Always Open' : '' 
  });

  // --- Helper: Currency Formatter ---
  const formatPrice = (amountInINR) => {
    if (currency === 'USD') {
      const val = amountInINR / EXCHANGE_RATE;
      return `$${val.toFixed(2)}`; 
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
  const serviceFeeINR = 10; 

  // ✅ MODIFIED: If SUV mode, base amount is fixed
  const baseAmountINR = isSUV ? 15000 : Number(price) * guestCount;
  const subTotalINR = baseAmountINR + serviceFeeINR;
  const gstAmountINR = Math.round(subTotalINR * 0.05);
  const totalAmountINR = subTotalINR + gstAmountINR;
  
  // ✅ MODIFIED: SUV uses 8000 online booking amount
  const advanceAmountINR = isSUV ? (onlineToken || 7761) : Math.round(totalAmountINR * 0.25); 
  const dueAmountINR = totalAmountINR - advanceAmountINR;

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

    if (!isSUV && Number(booking.guestSize) < minGuestSize) {
      return alert(`For this package, the minimum group size is ${minGuestSize}.`);
    }

    // ----------------------------------------------------
    // FIX 1: Ensure Date is a String (Backend Crash Prevention)
    // ----------------------------------------------------
    let finalDateString = booking.bookAt;
    if (booking.bookAt instanceof Date) {
        // Converts Date object to "Wed Nov 29 2025" format
        finalDateString = booking.bookAt.toDateString(); 
    } else if (typeof booking.bookAt === 'string') {
        // Already a string (from Fixed Batches)
        finalDateString = booking.bookAt;
    }

    try {
      // 1. Create Order on Backend
      const orderRes = await fetch(`${BASE_URL}/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            amount: advanceAmountDisplay, 
            currency: currency 
        }), 
      });
      
      const orderData = await orderRes.json();
      if (!orderData.success) {
          console.error("Order Creation Failed:", orderData);
          return alert("Error creating payment order. Please try again.");
      }

      // 2. Open Razorpay Window
      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.order.amount, 
        currency: currency, 
        name: "Ghume Ghume",
        description: `Advance for ${title}`, 
        image: "https://www.ghumeghume.com/static/media/logo.2dd53824f641f46a2885.webp", 
        order_id: orderData.order.id, 
        
        // ----------------------------------------------------
        // FIX 2: Correct Handler to Send Data to Backend
        // ----------------------------------------------------
        handler: async function (response) {
          console.log("RAZORPAY SUCCESS:", response); // Debug Log

          try {
            const verifyRes = await fetch(`${BASE_URL}/payment/paymentverification`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                // These 3 fields MUST match exactly for signature verification
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                
                // Booking Details (passed for DB saving)
                bookingDetails: {
                    ...booking,
                    bookAt: finalDateString, // Sending the SAFE string version
                    totalAmount: totalAmountDisplay, 
                    paidAmount: advanceAmountDisplay, 
                    dueAmount: dueAmountDisplay,
                    currency: currency, 
                    paymentStatus: 'Partial', 
                }
                }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
                navigate("/thank-you");
            } else {
                console.error("Verification Failed:", verifyData);
                alert("Payment Successful, but Verification Failed. Contact Support.");
            }
          } catch (verifyError) {
              console.error("Verification Network Error:", verifyError);
              alert("Network Error during verification.");
          }
        },
        prefill: { name: booking.fullName, email: user.email, contact: booking.phone },
        theme: { color: "#faa935" },
      };
      
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className='booking'>
      <div className='booking__top d-flex align-items-center justify-content-between'>
        {/* ✅ MODIFIED: SUV shows fixed price instead of per person */}
        <h3>{isSUV ? "₹15,000 Total" : `${formatPrice(price)} /per person`}</h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className="ri-star-s-fill"></i> 
          {/* If avgRating is 0 or undefined, show 4.5; otherwise show avgRating */}
          {avgRating === 0 || !avgRating ? 4.5 : avgRating} 
          ({reviews?.length || 33})
        </span>
      </div>

      <div className='booking__form'>
        {/* Currency Switch */}
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
            <label className="input-label">Group Size ({isSUV ? "Max: 9" : `Min: ${minGuestSize}`})</label>
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

          {/* ✅ MODIFIED: Hide date logic for SUV since it is "Always Open" */}
          {!isSUV ? (
            <>
              {/* Check if this tour actually has fixed dates in the array */}
              {currentTourDates.length > 0 ? (
                <>
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
                </>
              ) : (
                /* NO FIXED DATES AVAILABLE: Just show the standard DatePicker */
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
            </>
          ) : (
            <div className="p-3 border rounded bg-white shadow-sm mb-3">
            {/* Header Section */}
            <div className="d-flex align-items-center text-success mb-2">
              <i className="ri-calendar-check-line fs-5 me-2"></i>
              <strong className="text-uppercase small">Always Open</strong>
            </div>

            {/* Details Section */}
            <p className="text-muted small mb-2">
              No booking date required. Available all year round for groups of up to 
              <span className="text-dark fw-bold"> 9 people</span>.
            </p>

            <hr className="my-2 opacity-10" />

            {/* Contact Section */}
            <div className="d-flex align-items-center gap-2 small">
              <i className="ri-customer-service-2-fill text-primary"></i>
              <span className="text-secondary">Queries?</span>
              <a href="tel:+919105498001" className="text-decoration-none fw-bold text-primary">
                +91 91054 98001
              </a>
            </div>
          </div>
          )}
        </Form>      
      </div>
      
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0 summary-item'>
            {/* ✅ MODIFIED: Adjusted summary labels for SUV fixed rate */}
            <h5>{isSUV ? "Fixed Vehicle Rate" : `${formatPrice(price)} x ${guestCount} person`}</h5>
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
            <h5>Total Package Cost</h5>
            <span>{formatPrice(totalAmountINR)}</span>
          </ListGroupItem>
        </ListGroup>

        <div className="payment-split">
            <div className="split-row highlight">
                {/* ✅ MODIFIED: Dynamic label for SUV online token */}
                <span>{isSUV ? "Online Token" : "Pay Now (25%)"}</span>
                <span className="amount">{formatPrice(advanceAmountINR)}</span>
            </div>
            <div className="split-row text-muted">
                <span>{isSUV ? "Pay on Arrival" : "Pay Later"}</span>
                <span>{formatPrice(dueAmountINR)}</span>
            </div>
            <small>{isSUV ? "(₹7,761 Online / ₹8,000 Offline)" : "(50% on Day 1, 50% on Last Day)"}</small>
           </div>
        
        <Button className='btn primary__btn w-100 mt-4 book-btn' onClick={handlePayment}>
          Book for {formatPrice(advanceAmountINR)}
        </Button>
      </div>
    </div>
  );
}

export default Booking;


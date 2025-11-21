import React, { useState, useContext, useEffect } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

// 1. Import BOTH Date components
import DateSlots from './DateSlots';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// ✅ Import your local logo
import logo from "../../assets/images/logo.png";

// 2. Import Data
import { allTourDates } from '../../assets/data/tourDates';

const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_API_KEY;


const Booking = ({ tour, avgRating, tourId }) => {
  const { price, reviews, title, priceGroup } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Pricing Mode Logic
  const isGroupMode = Number(price) === Number(priceGroup);
  const minGuestSize = isGroupMode ? 5 : 1;

  // Get Fixed Dates for this specific tour
  const currentTourDates = allTourDates[tourId] || [];

  // ✅ STATE: Toggle between 'fixed' (batches) and 'custom' (calendar)
  const [dateMode, setDateMode] = useState('fixed'); // 'fixed' or 'custom'

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: minGuestSize,
    bookAt: '' // Can hold a String (Fixed) or Date Object (Custom)
  });

  // Effect: Enforce Guest Size
  useEffect(() => {
    setBooking(prev => {
      if (Number(prev.guestSize) < minGuestSize) {
        return { ...prev, guestSize: minGuestSize };
      }
      return prev;
    });
  }, [minGuestSize]);

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // ✅ Handle Fixed Batch Selection
  const handleSlotSelect = (dateString) => {
    setBooking(prev => ({ ...prev, bookAt: dateString }));
  };

  // ✅ Handle Custom Calendar Selection
  const handleCalendarChange = (date) => {
    setBooking(prev => ({ ...prev, bookAt: date }));
  };

  // Payment Math
  const serviceFee = 10;
  const baseAmount = Number(price) * Number(booking.guestSize);
  const subTotal = baseAmount + serviceFee;
  const gstAmount = Math.round(subTotal * 0.05);
  const totalAmount = subTotal + gstAmount;
  const advanceAmount = Math.round(totalAmount * 0.35);
  const dueAmount = totalAmount - advanceAmount;

  // Payment Handler
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user) return navigate("/register");

    if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
      return alert('Please fill in all information and select a date.');
    }

    if (Number(booking.guestSize) < minGuestSize) {
      return alert(`For this package, the minimum group size is ${minGuestSize}.`);
    }

    // ✅ Format Date before sending (Handle Object vs String)
    let finalDateString = booking.bookAt;
    if (typeof booking.bookAt === 'object') {
        // Converts Date Object to "Wed Dec 10 2025" format
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
        image: logo, // ✅ Use your local logo 
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
                bookAt: finalDateString, // ✅ Send the formatted string
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
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handlePayment}>
          <FormGroup>
            <input type='text' placeholder='Full name' id='fullName' required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type='number' placeholder='Phone' id='phone' required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type='number' placeholder='Total Members' id='guestSize' required onChange={handleChange} min={minGuestSize} value={booking.guestSize} />
          </FormGroup>


          {/* ✅ DATE SELECTION TOGGLE (Modern Pill Style) */}
<div className="d-flex gap-2 mb-3" style={{ background: '#f3f4f6', padding: '5px', borderRadius: '50px' }}>
  
  {/* Option 1: Fixed Batches */}
  <label 
    style={{ 
      flex: 1, 
      textAlign: 'center', 
      padding: '8px 0', 
      borderRadius: '50px', 
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: '0.3s',
      background: dateMode === 'fixed' ? '#faa935' : 'transparent',
      color: dateMode === 'fixed' ? '#fff' : '#555',
      boxShadow: dateMode === 'fixed' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
    }}
  >
    <input 
      type="radio" 
      name="dateMode" 
      value="fixed" 
      checked={dateMode === 'fixed'} 
      onChange={() => setDateMode('fixed')}
      style={{ display: 'none' }} 
    />
    Fixed Batches
  </label>

  {/* Option 2: Custom Date */}
  <label 
    style={{ 
      flex: 1, 
      textAlign: 'center', 
      padding: '8px 0', 
      borderRadius: '50px', 
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: '0.3s',
      background: dateMode === 'custom' ? '#faa935' : 'transparent',
      color: dateMode === 'custom' ? '#fff' : '#555',
      boxShadow: dateMode === 'custom' ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
    }}
  >
    <input 
      type="radio" 
      name="dateMode" 
      value="custom" 
      checked={dateMode === 'custom'} 
      onChange={() => setDateMode('custom')}
      style={{ display: 'none' }} 
    />
    Custom Date
  </label>

</div>

          {/* ✅ CONDITIONAL RENDERING */}
          {dateMode === 'fixed' ? (
             <>
                <h6 style={{fontSize: '0.9rem', color: '#777', marginBottom: '8px'}}>Select a Batch:</h6>
                <DateSlots onDateSelect={handleSlotSelect} slotsData={currentTourDates} />
             </>
          ) : (
             <FormGroup className="d-flex flex-column">
                <h6 style={{fontSize: '0.9rem', color: '#777', marginBottom: '8px'}}>Pick your own date:</h6>
                <DatePicker 
                    selected={typeof booking.bookAt === 'object' ? booking.bookAt : null} 
                    onChange={handleCalendarChange}
                    minDate={new Date()} 
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Click to select date"
                    className="form-control"
                    wrapperClassName="w-100"
                    onKeyDown={(e) => e.preventDefault()} 
                />
             </FormGroup>
          )}

        </Form>      
      </div>
      
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center justify-content-between'>
              ₹{price} <i className="ri-close-line"></i> {booking.guestSize} person
              <span>₹{baseAmount}</span>
            </h5>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center justify-content-between'>
              Service charge <span>₹{serviceFee}</span>
            </h5>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center justify-content-between'>
              GST (5%) <span>₹{gstAmount}</span>
            </h5>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5 className='d-flex align-items-center justify-content-between'>
              Total Trip Cost <span>₹{totalAmount}</span>
            </h5>
          </ListGroupItem>

          <div style={{ background: '#fff8e1', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
            <ListGroupItem className='border-0 px-0 py-1 bg-transparent'>
              <h6 className='d-flex align-items-center justify-content-between m-0' style={{ color: '#d48806' }}>
                Pay Now (35% Advance) <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>₹{advanceAmount}</span>
              </h6>
            </ListGroupItem>
            <ListGroupItem className='border-0 px-0 py-1 bg-transparent'>
              <div className='d-flex flex-column w-100'>
                 <h6 className='d-flex align-items-center justify-content-between m-0 text-muted' style={{ fontSize: '0.9rem' }}>
                  Pay Later (Balance) <span>₹{dueAmount}</span>
                </h6>
                <small className='text-muted mt-1' style={{fontSize: '0.75rem', fontStyle: 'italic'}}>
                   (50% on Day 1, 50% on Last Day)
                </small>
              </div>
            </ListGroupItem>
          </div>
        </ListGroup>
        
        <Button className='btn primary__btn w-100 mt-4' onClick={handlePayment}>
          Book for ₹{advanceAmount}
        </Button>
        <p className="text-center mt-2 text-muted" style={{fontSize: '0.8rem'}}>
          Remaining ₹{dueAmount} payable at base camp.
        </p>
      </div>
    </div>
  );
}

export default Booking;
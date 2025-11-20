import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

// 1. Import the new DateSlots component
import DateSlots from './DateSlots';
// Import the centralized date data
import { allTourDates } from '../../assets/data/tourDates';

// Make sure to add this key to your .env.local file in the frontend
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY;

// 2. Accept 'tourId' as a new prop
const Booking = ({ tour, avgRating, tourId }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 3. Get the specific dates for this tour ID
  const currentTourDates = allTourDates[tourId] || [];

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: '' 
  });

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleDateSelect = (date) => {
    setBooking(prev => ({ ...prev, bookAt: date }));
  };

  // === PAYMENT & GST CALCULATION LOGIC ===
  const serviceFee = 10;
  
  // 1. Base Cost (Tour Price * Guests)
  const baseAmount = Number(price) * Number(booking.guestSize);
  
  // 2. Subtotal (Base + Service Fee)
  const subTotal = baseAmount + serviceFee;

  // 3. GST (5% of Subtotal)
  const gstAmount = Math.round(subTotal * 0.05);

  // 4. Grand Total (Subtotal + GST)
  const totalAmount = subTotal + gstAmount;
  
  // 5. Calculate 35% Advance on the Grand Total
  const advanceAmount = Math.round(totalAmount * 0.35);
  
  // 6. The remaining amount
  const dueAmount = totalAmount - advanceAmount;

  // === RAZORPAY PAYMENT HANDLER ===
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!user || user === undefined || user === null) {
      return alert('Please sign in to book');
    }

    if (!booking.fullName || !booking.phone || !booking.bookAt || !booking.guestSize) {
      return alert('Please fill in all information and select a date slot.');
    }

    try {
      // Create Order on Backend (Sending ADVANCE AMOUNT only)
      const orderRes = await fetch(`${BASE_URL}/payment/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: advanceAmount }), 
      });
      
      const orderData = await orderRes.json();

      if (!orderData.success) {
        return alert("Error creating Razorpay order: " + orderData.message);
      }

      // Configure Razorpay Options
      const options = {
        key: RAZORPAY_KEY,
        amount: orderData.order.amount, 
        currency: "INR",
        name: "Ghume Ghume",
        description: `Advance for ${title}`, 
        image: "https://i.imgur.com/qf8xZ7A.png", 
        order_id: orderData.order.id, 
        handler: async function (response) {
          // Verify Payment on Backend
          const verifyRes = await fetch(`${BASE_URL}/payment/paymentverification`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              // Send full booking details to be saved
              bookingDetails: {
                ...booking,
                totalAmount: totalAmount,
                paidAmount: advanceAmount,
                dueAmount: dueAmount,
                paymentStatus: 'Partial', 
              }
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            navigate("/thank-you");
          } else {
            alert("Payment Verification Failed. Please contact support.");
          }
        },
        prefill: {
          name: booking.fullName,
          email: user.email,
          contact: booking.phone,
        },
        theme: {
          color: "#faa935", 
        },
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
          <i className="ri-star-s-fill"></i>  
          {avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>

      {/* ============== booking form ==================*/}
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
            <input type='number' placeholder='Guests' id='guestSize' required onChange={handleChange} min="1" />
          </FormGroup>
        </Form>

        <h5 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>Select Date Slot</h5>
        <DateSlots onDateSelect={handleDateSelect} slotsData={currentTourDates} />
      
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
              Service charge
              <span>₹{serviceFee}</span>
            </h5>
          </ListGroupItem>

          {/* === NEW GST LINE ITEM === */}
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center justify-content-between'>
              GST (5%)
              <span>₹{gstAmount}</span>
            </h5>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5 className='d-flex align-items-center justify-content-between'>
              Total Trip Cost
              <span>₹{totalAmount}</span>
            </h5>
          </ListGroupItem>

          <div style={{ background: '#fff8e1', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
            <ListGroupItem className='border-0 px-0 py-1 bg-transparent'>
              <h6 className='d-flex align-items-center justify-content-between m-0' style={{ color: '#d48806' }}>
                Pay Now (35% Advance)
                <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>₹{advanceAmount}</span>
              </h6>
            </ListGroupItem>
            <ListGroupItem className='border-0 px-0 py-1 bg-transparent'>
              <div className='d-flex flex-column w-100'>
                 <h6 className='d-flex align-items-center justify-content-between m-0 text-muted' style={{ fontSize: '0.9rem' }}>
                  Pay Later (Balance)
                  <span>₹{dueAmount}</span>
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
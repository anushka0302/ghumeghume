const dotenv = require('dotenv');
dotenv.config(); // Must be the very first thing to run

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const tourRoute = require('./routes/tours');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/reviews');
const bookingRoute = require('./routes/bookings');
const paymentRoute = require('./routes/payment');

const app = express();
const port = process.env.PORT || 8000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://ghumeghume.com',
  'https://www.ghumeghume.com',
  'https://ghumeghume.in',
  'https://www.ghumeghume.in'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This is the magic line
};

// ...
app.use(cors(corsOptions));
// ...

// Database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB database connected');
  } catch (err) {
    console.log('MongoDB database connection failed');
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/payment', paymentRoute);

app.listen(port, () => {
  connect();
  console.log('Server listening on port', port);
});


// const express=require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const tourRoute = require('./routes/tours');
// const userRoute = require('./routes/users');
// const authRoute = require('./routes/auth');
// const reviewRoute = require('./routes/reviews');
// const bookingRoute = require('./routes/bookings');

// /*import dotenv from 'dotenv'
// import mongoose from 'mongoose'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import tourRoute from './routes/tours.js'
// import userRoute from './routes/users.js'
// import authRoute from './routes/auth.js'
// import reviewRoute from './routes/reviews.js'
// import bookingRoute from './routes/bookings.js'*/
// dotenv.config()
// const app = express()
// const port = process.env.PORT || 8000

// const corsOptions={
//   origin:true,
//   credentials:true
// }

// //database connection
// mongoose.set("strictQuery",false);
// const connect = async () => {
//     try {
//   await mongoose.connect(process.env.MONGO_URI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
//   })
//   console.log('MongoDB database connected');
//     } catch (err) {
// console.log('MongoDB database connection failed');
//     }
// };



// //middleware
// app.use(express.json())
// app.use(cors(corsOptions))
// app.use(cookieParser())
// app.use('/api/v1/auth',authRoute);
// app.use('/api/v1/tours',tourRoute);
// app.use('/api/v1/users',userRoute);
// app.use('/api/v1/review',reviewRoute);
// app.use('/api/v1/booking',bookingRoute);



// app.listen(port, () => {
//     connect();
//     console.log('Server listening on port', port);
// })
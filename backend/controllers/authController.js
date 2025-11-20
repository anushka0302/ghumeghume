const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user registration
const register = async (req, res) => {
  try {
    //hashing password 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    // === FIX: Changed req.body.username to req.body.userName ===
    // This now matches your frontend Register.jsx form
    const newUser = new User({
      username: req.body.userName, 
      email: req.body.email,
      password: hash
      // 'photo' is not required, so we omit it.
    });

    await newUser.save();
    res.status(200).json({ success: true, message: 'Successfully created' });

  } catch (err) {
    // === UPDATED ERROR HANDLING ===
    // Check for duplicate user error (MongoDB code 11000)
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Username or Email already exists.' });
    }
    
    // For all other errors (like validation errors)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create. Try again.', 
      error: err.message // Send back the actual error
    });
  }
};


//user login
const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    //if user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    //if user exist then check the password or compare the password 
    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    //if password is incorrect 
    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }
    const { password, role, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    //set token in the browser cookies and send the response to the client 
    // This config is for cross-site (frontend/backend on diff domains)
    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      sameSite: 'none', 
      secure: true      
    }).status(200).json({ token, data: { ...rest }, role });

    // === IF RUNNING LOCALLY (http://localhost) use this instead ===
    /*
    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    }).status(200).json({ token, data: { ...rest }, role });
    */

  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
}

module.exports = {
  register, 
  login
}
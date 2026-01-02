const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library"); // ✅ New Import

// Initialize Google Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// === GOOGLE LOGIN ===
const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify the Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    // 2. Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if they don't exist (Google Users)
      // We generate a random password hash since they use Google to auth
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(Math.random().toString(36).slice(-10), salt);

      user = new User({
        username: name,
        email: email,
        password: hash,
        photo: picture,
      });
      await user.save();
    }

    // 3. Create JWT token (Matching your existing login logic)
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    const { password, role, ...rest } = user._doc;

    // 4. Set cookie and send response (Matching your existing cookie config)
    res.cookie('accessToken', jwtToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      sameSite: 'none', 
      secure: true      
    }).status(200).json({ 
        success: true, 
        message: "Successfully logged in with Google", 
        token: jwtToken, 
        data: { ...rest }, 
        role 
    });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Google login failed', error: err.message });
  }
};

// === EXISTING USER REGISTRATION ===
const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
      username: req.body.userName, 
      email: req.body.email,
      password: hash
    });

    await newUser.save();
    res.status(200).json({ success: true, message: 'Successfully created' });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Username or Email already exists.' });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create. Try again.', 
      error: err.message 
    });
  }
};

// === EXISTING USER LOGIN ===
const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }
    const { password, role, ...rest } = user._doc;

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      sameSite: 'none', 
      secure: true      
    }).status(200).json({ token, data: { ...rest }, role });

  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
}

module.exports = {
  register, 
  login,
  googleLogin // ✅ Added to exports
}
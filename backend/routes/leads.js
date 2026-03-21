const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// POST: Save a new lead
router.post('/', async (req, res) => {
    const newLead = new Lead(req.body);
    try {
        const savedLead = await newLead.save();
        res.status(200).json({ success: true, message: "Lead captured!", data: savedLead });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to capture lead" });
    }
});

module.exports = router;
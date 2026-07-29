const express = require('express');
const router = express.Router();
const https = require('https');
const User = require('../models/User');

router.post('/initialize-subscription', async (req, res) => {
  try {
    const { email, amount } = req.body;

    const params = JSON.stringify({
      email,
      amount,
      callback_url: "https://expense-tracker-o1mw.onrender.com/dashboard.html?success=true"
    });

    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const apiReq = https.request(options, apiRes => {
      let data = '';
      apiRes.on('data', chunk => { data += chunk; });
      apiRes.on('end', () => {
        res.json(JSON.parse(data));
      });
    });

    apiReq.on('error', error => {
      res.status(500).json({ error: error.message });
    });

    apiReq.write(params);
    apiReq.end();

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

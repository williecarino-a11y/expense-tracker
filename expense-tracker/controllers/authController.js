const User = require('../models/User');

exports.initializeAccount = async (req, res) => {
  try {
    const { email, authProvider, onboardingProfile } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        authProvider,
        onboardingProfile
      });
      await user.save();
    } else {
      user.onboardingProfile = onboardingProfile;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Global account initialized successfully',
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

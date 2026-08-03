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

// --- ADD THIS NEW FUNCTION BELOW ---
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Check if user has completed onboarding profile
    const needsOnboarding = !user.onboardingProfile || !user.onboardingProfile.liquidityFlow;

    res.status(200).json({
      success: true,
      redirectUrl: needsOnboarding ? '/onboarding.html' : '/dashboard.html'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

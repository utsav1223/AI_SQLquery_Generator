const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
// this function is going to generate the token...
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


// here i have created register controller....
// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;

//   const exists = await User.findOne({ email });
//   if (exists)
//     return res.status(400).json({ message: "User already exists" });

//   const hashed = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashed
//   });

//   res.status(201).json({ message: "Registered successfully" });
// };



exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    plan: "free",
    dailyUsage: 0
  });

  const token = generateToken(user);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
      plan: user.plan,
      dailyUsage: user.dailyUsage
    }
  });
};



// this function is for login controller....
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user);

  // res.json({
  //   token,
  //   user: {
  //     id: user._id,
  //     name: user.name,
  //     role: user.role
  //   }
  // });

  res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    role: user.role,
    plan: user.plan || "free",
    dailyUsage: user.dailyUsage || 0
  }
});

};




// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // Generate random token
//   const resetToken = crypto.randomBytes(32).toString("hex");

//   // Hash token before saving to DB
//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   user.resetPasswordToken = hashedToken;
//   user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

//   await user.save();

//   const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

//   // For now just send response instead of real email
//   res.json({
//     message: "Password reset link generated",
//     resetUrl
//   });
// };






// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // Generate 6-digit OTP
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   // Hash OTP before saving
//   const hashedOTP = crypto
//     .createHash("sha256")
//     .update(otp)
//     .digest("hex");

//   user.resetOTP = hashedOTP;
//   user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
//   user.resetOTPAttempts = 0;

//   await user.save();

//   // For now send OTP in response (later use nodemailer)
//   res.json({
//     message: "OTP sent to email",
//     otp // REMOVE THIS IN PRODUCTION
//   });
// };























exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const crypto = require("crypto");

  const hashedOTP = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  user.resetOTP = hashedOTP;
  user.resetOTPExpire = Date.now() + 10 * 60 * 1000;
  user.resetOTPAttempts = 0;

  await user.save();

  const message = `
Your OTP for password reset is:

${otp}

This OTP will expire in 10 minutes.
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset OTP",
      message
    });

    res.json({ message: "OTP sent to your email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email sending failed" });
  }
};


exports.verifyOTPAndReset = async (req, res) => {
  const { email, otp, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.resetOTP) {
    return res.status(400).json({ message: "Invalid request" });
  }

  if (user.resetOTPExpire < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (user.resetOTPAttempts >= 5) {
    return res.status(400).json({ message: "Too many attempts" });
  }

  const hashedOTP = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  if (hashedOTP !== user.resetOTP) {
    user.resetOTPAttempts += 1;
    await user.save();
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // OTP correct → reset password
  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetOTP = undefined;
  user.resetOTPExpire = undefined;
  user.resetOTPAttempts = 0;

  await user.save();

  res.json({ message: "Password reset successful" });
};






exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    id: user._id,
    name: user.name,
    role: user.role,
    plan: user.plan,
    dailyUsage: user.dailyUsage
  });
};









/* =========================================
   UPDATE PROFILE
========================================= */
exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true }
    );

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan
    });

  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};


/* =========================================
   CHANGE PASSWORD
========================================= */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findById(req.user.userId);

    const match = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Current password is incorrect"
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password changed successfully" });

  } catch (error) {
    res.status(500).json({ message: "Password change failed" });
  }
};


/* =========================================
   DELETE ACCOUNT
========================================= */
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete user data
    await Query.deleteMany({ userId });
    await Schema.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: "Account deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Account deletion failed" });
  }
};










// exports.resetPassword = async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   const hashedToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken: hashedToken,
//     resetPasswordExpire: { $gt: Date.now() }
//   });

//   if (!user) {
//     return res.status(400).json({ message: "Invalid or expired token" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   user.password = hashedPassword;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   res.json({ message: "Password reset successful" });
// };


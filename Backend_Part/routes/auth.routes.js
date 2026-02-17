const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { register, login, forgotPassword, verifyOTPAndReset, resetPassword  } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const authMiddleware = require("../middleware/auth.middleware");
const { getMe } = require("../controllers/auth.controller");


const {
  updateProfile,
  changePassword,
  deleteAccount
} = require("../controllers/auth.controller");

router.put("/update-profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);
router.delete("/delete-account", authMiddleware, deleteAccount);


router.post("/register", registerValidator, validate, register);
router.post("/login",loginValidator, validate, login);
router.post("/forgot-password", forgotPassword);
// router.put("/reset-password/:token", resetPassword);
router.post("/verify-otp", verifyOTPAndReset);



router.get("/me", authMiddleware, getMe);

// Google OAuth Start
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google Callback
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     session: false
//   }),
//   (req, res) => {
//     const token = jwt.sign(
//       {
//         userId: req.user._id,
//         role: req.user.role
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.redirect(
//       `http://localhost:5173/oauth-success?token=${token}`
//     );
//   }
// );




router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {

    const token = jwt.sign(
      {
        userId: req.user._id,
        role: req.user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const user = {
      id: req.user._id,
      name: req.user.name,
      role: req.user.role,
      plan: req.user.plan || "free",
      dailyUsage: req.user.dailyUsage || 0
    };

    const encodedUser = encodeURIComponent(JSON.stringify(user));

    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}&user=${encodedUser}`
    );
  }
);


module.exports = router;

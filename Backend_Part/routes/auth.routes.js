const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { register, login, forgotPassword, resetPassword } = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerValidator, loginValidator } = require("../validators/auth.validator");

router.post("/register", registerValidator, validate, register);
router.post("/login",loginValidator, validate, login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);


// Google OAuth Start
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        userId: req.user._id,
        role: req.user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    );
  }
);

module.exports = router;

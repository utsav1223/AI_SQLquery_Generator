const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  createOrder,
  verifyPayment
} = require("../controllers/payment.controller");

router.post("/create-order", auth, createOrder);
router.post("/verify", auth, verifyPayment);

module.exports = router;

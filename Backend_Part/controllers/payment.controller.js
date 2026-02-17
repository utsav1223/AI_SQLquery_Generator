const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../models/User");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     const renewalDate = new Date();
//     renewalDate.setDate(renewalDate.getDate() + 30);

//     await User.findByIdAndUpdate(req.user.userId, {
//       plan: "pro",
//       credits: -1, // unlimited
//       billingRenewal: renewalDate
//     });

//     res.json({ message: "Payment successful. Plan upgraded." });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// };




// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     const renewalDate = new Date();
//     renewalDate.setMonth(renewalDate.getMonth() + 1);

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.userId,
//       {
//         plan: "pro",
//         credits: -1, // unlimited
//         billingRenewal: renewalDate
//       },
//       { new: true }
//     );

//     console.log("Updated user:", updatedUser);

//     res.json({ message: "Payment successful" });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// };




















// exports.verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     const renewalDate = new Date();
//     renewalDate.setMonth(renewalDate.getMonth() + 1);

//     await User.findByIdAndUpdate(req.user.userId, {
//       plan: "pro",
//       credits: -1, // unlimited
//       billingRenewal: renewalDate
//     });

//     res.json({ message: "Payment successful. Plan upgraded." });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// };











exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  // 🔥 Set renewal date (1 month from now)
  const renewalDate = new Date();
  renewalDate.setMonth(renewalDate.getMonth() + 1);

  await User.findByIdAndUpdate(req.user.userId, {
    plan: "pro",
    credits: 999999, // or unlimited logic
    billingRenewal: renewalDate
  });

  res.json({ message: "Payment successful. Plan upgraded." });
};


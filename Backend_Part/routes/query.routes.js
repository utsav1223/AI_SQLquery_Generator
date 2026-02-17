// const router = require("express").Router();
// const authMiddleware = require("../middleware/auth.middleware");
// // const { generateQuery } = require("../controllers/query.controller");

// router.post("/generate", authMiddleware, generateQuery);

// module.exports = router;











// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const { requirePro } = require("../middleware/plan.middleware");
// const {
//   getUserQueries,
//   deleteQuery,
//   getAnalytics,
//   getAdvancedAnalytics
// } = require("../controllers/query.controller");

// router.get("/", auth, getUserQueries);
// router.delete("/:id", auth, deleteQuery);
// router.get("/analytics", auth, getAnalytics);
// router.get("/advanced-analytics", auth, requirePro, getAdvancedAnalytics);





const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { requirePro } = require("../middleware/plan.middleware");
const {
  getUserQueries,
  deleteQuery,
  getAnalytics,
  getAdvancedAnalytics,
  togglePin,
  getOverviewStats,
  getOverview
} = require("../controllers/query.controller");

// 🔹 SPECIFIC ROUTES FIRST
router.get("/advanced-analytics", auth, requirePro, getAdvancedAnalytics);
router.get("/analytics", auth, getAnalytics);

// 🔹 GENERIC ROUTES LAST
router.get("/", auth, getUserQueries);
router.delete("/:id", auth, deleteQuery);

router.patch("/:id/pin", auth, requirePro, togglePin);

router.get("/overview", auth, getOverviewStats);

router.get("/overview", auth, getOverview);


router.patch("/:id/pin", auth, async (req, res) => {
  const query = await Query.findById(req.params.id);

  if (!query) return res.status(404).json({ message: "Not found" });

  query.pinned = !query.pinned;
  await query.save();

  res.json(query);
});


module.exports = router;


// router.post("/optimize", auth, requirePro, optimizeQuery);
// router.post("/validate", auth, requirePro, validateQuery);
// router.post("/explain", auth, requirePro, explainQuery);




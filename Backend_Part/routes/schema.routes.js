const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  saveSchema,
  getSchema
} = require("../controllers/schema.controller");

router.get("/", auth, getSchema);
router.post("/", auth, saveSchema);

module.exports = router;

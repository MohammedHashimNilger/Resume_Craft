const router       = require("express").Router();
const aiController = require("../controllers/aiController");

router.post("/", aiController.generateAI);

module.exports = router;

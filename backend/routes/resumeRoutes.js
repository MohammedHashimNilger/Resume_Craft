const router           = require("express").Router();
const authenticate     = require("../middleware/authMiddleware");
const resumeController = require("../controllers/resumeController");

// All resume routes require authentication
router.use(authenticate);

router.get("/",             resumeController.listResumes);
router.get("/:id",          resumeController.getResume);
router.post("/",            resumeController.createResume);
router.put("/:id",          resumeController.updateResume);
router.patch("/:id/label",  resumeController.renameResume);
router.delete("/:id",       resumeController.deleteResume);

module.exports = router;

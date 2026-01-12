const { Router } = require("express");
const { importJson } = require("../controllers/import.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

const router = Router();

router.post("/", requireAuth, importJson);

module.exports = router;

const express = require("express");
const { addMarquage, getPointagesP, getPointagesA} = require("../controllers/pointageController");
const router = express.Router();

router.post("/marquer", addMarquage);
router.get("/presences", getPointagesP);
router.get("/absences", getPointagesA);

module.exports = router;

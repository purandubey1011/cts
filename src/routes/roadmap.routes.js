let express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { getroadmap } = require("../controllers/roadmap.controllers");
let router = express.Router();

// home route
router.route("/").post(isAuthenticated, getroadmap)


// router.route("/getpdf").post(isAuthenticated, getpdf)

module.exports = router;
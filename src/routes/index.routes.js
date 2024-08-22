let express = require("express");
const { homepage,signup,signin,signout, currentuser ,edituser} = require("../controllers/index.controllers");
const { isAuthenticated } = require("../middlewares/auth");
let router = express.Router();

// home route
router.route("/").get(isAuthenticated, homepage)

// current user route route
router.route("/user").post(isAuthenticated,currentuser)

// update user route
router.route("/edituser/:id").post(isAuthenticated,edituser)

// signup
router.route("/signup").post(signup)

// signin
router.route("/signin").post(signin)

// signout
router.route("/signout").post(signout)


module.exports = router;
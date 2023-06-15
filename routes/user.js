const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  forgotPassword,
  getLoggedInUserDetails,
  changePassword,
  updateUserDetails,
  followUser,
  searchUser,
  getFeed,
} = require("../controllers/userControllers");

const { isLoggedIn } = require("../middlewares/user");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/userdashboard/:id").get(getLoggedInUserDetails);
router.route("/password/update").post(changePassword);
router.route("/userdashboard/update").post(updateUserDetails);
router.route("/search").get(searchUser);
router.route("/getFeed/:id").get(isLoggedIn, getFeed);

router.route("/follow").get(isLoggedIn, followUser);
module.exports = router;

const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  likePost,
} = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/userposts/:id").get(isLoggedIn, getAllPosts);
router.route("/post/likePost/:id").get(isLoggedIn, likePost);

module.exports = router;

const express = require("express");
const router = express.Router();

const { createPost, getAllPosts } = require("../controllers/postController");
const { isLoggedIn } = require("../middlewares/user");

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/userposts").get(isLoggedIn, getAllPosts);

module.exports = router;

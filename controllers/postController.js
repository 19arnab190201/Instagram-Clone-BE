const Post = require("../models/post");
const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");

exports.createPost = BigPromise(async (req, res, next) => {
  const { postCaption, postLocation, postTags, postMentions } = req.body;

  let mediaArray = [];
  let postArray = [];
  let media = req.files.media;

  //   console.log("BODY", req.body);
  //   console.log("media", media);

  if (media) {
    if (Array.isArray(media)) {
      mediaArray = media;
    } else {
      mediaArray.push(media);
    }
  }

  console.log("MEDIA ARRAY", mediaArray);

  for (let index = 0; index < mediaArray.length; index++) {
    console.log("UPLOAD START...");
    let result = await cloudinary.v2.uploader.upload(
      mediaArray[index].tempFilePath,
      {
        folder: "media-posts",
      }
    );
    console.log("RESULT", result);
    postArray.push({
      id: result.public_id,
      secure_url: result.secure_url,
    });
  }

  console.log("USER", req.user._id);

  const post = await Post.create({
    postMedia: postArray,
    postCaption,
    postLocation,
    postTags,
    postMentions,
    postOwner: req.user._id,
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { userPosts: post._id } },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    message: "Post created successfully",
    post,
  });
});

exports.getAllPosts = BigPromise(async (req, res, next) => {
  const userId = req.body.userId;
  const posts = await Post.find({ postOwner: userId });

  res.status(200).json({
    status: "success",
    message: "All posts",
    posts,
  });
});

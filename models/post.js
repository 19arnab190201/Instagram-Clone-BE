const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postMedia: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  postCaption: {
    type: String,
    required: [true, "Please provide a caption"],
    trim: true,
    maxlength: [
      1000,
      "A post caption must have less or equal then 1000 characters",
    ],
    minlength: [1, "A post caption must have more or equal then 1 characters"],
  },
  postLikes: {
    type: Array,
    default: [],
  },
  postComments: {
    type: Array,
    default: [],
  },

  postOwner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A post must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  postType: {
    type: String,
    enum: ["post", "reel"],
    default: "post",
  },
  postLocation: {
    type: String,
    default: "",
  },
  postTags: {
    type: Array,
    default: [],
  },
  postMentions: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Post", postSchema);

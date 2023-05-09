const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    maxlength: [40, "A user name must have less or equal then 40 characters"],
    minlength: [5, "A user name must have more or equal then 5 characters"],
  },
  userName: {
    type: String,
    required: [true, "Please provide your user name"],
    trim: true,
    maxlength: [15, "A user name must have less or equal then 40 characters"],
    minlength: [5, "A user name must have more or equal then 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  profilePhoto: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: [8, "A user password must have more or equal then 8 characters"],
    select: false,
  },
  accountType: {
    type: String,
    enum: ["Public", "Private"],
    default: "Public",
  },
  userIntrests: {
    type: Array,
    default: [],
  },
  userFollowers: {
    type: Array,
    default: [],
  },
  followRequests: {
    type: Array,
    default: [],
  },
  userFollowing: {
    type: Array,
    default: [],
  },
  userPosts: {
    type: Array,
    default: [],
  },
});

//Encrypting password before saving
userSchema.pre("save", async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Compare user password with hashed password in database
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

//Generate forgot password token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//Generate forgot password token
userSchema.methods.getForgotPasswordToken = function () {
  //Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //Hash and set to forgotPasswordToken
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //Set token expiry time
  this.forgotPasswordExpiry = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);

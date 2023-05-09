const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the home page",
  });
});

exports.homeDummy = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the another home page",
  });
};
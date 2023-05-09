const express = require("express");
require("dotenv").config();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

app.use(function (req, res, next) {
  var origin = req.headers.origin;
  console.log("Request origin:", origin);
  // perform other middleware actions or call next() here
  next();
});

// var whitelist = ["http://localhost:5173", "http://127.0.0.1:5173"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     console.log("ORIGIN", origin);

//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

//Morgan middleware
app.use(morgan("tiny"));

//cookie parser middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//ALL ROUTES
const home = require("./routes/home");
const user = require("./routes/user");
const post = require("./routes/post");

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MIDDLEWARE
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", post);

module.exports = app;

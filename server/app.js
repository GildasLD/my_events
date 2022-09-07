const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
var fs = require("fs");

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

const upload = multer({
  storage: storage,
});

const buildPath = path.join(__dirname, "..", "build");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model/user");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(express.json());
app.use(express.static(buildPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require("./config/database").connect();

const MongoClient = require("mongodb").MongoClient;
let db;
MongoClient.connect(
  "mongodb://127.0.0.1:27042/mern-pool",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (error, client) {
    db = client.db();
  }
);
app.use(
  session({
    genid: function () {
      return uuidv4();
    },
    secret: "5aaeb94eb0b288f13e77728dceeabe3d4ac",
    resave: false,
    saveUninitialized: true,
    cookie: {}, // cookie: { secure: true }
  })
);

app.post("/register", async (req, res) => {
  console.warn(req.body);
  try {
    let { login, email, password } = req.body;
    (email && password && login) || console.log("All input is required");
    if (await User.findOne({ email: email })) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    // let encryptedUserPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        login: login,
        email: email.toLowerCase(),
        password: password, // password: encryptedUserPassword,
        img: {
          data: Buffer,
          contentType: String,
        },
        token: jwt.sign({ email: email }, process.env.TOKEN_KEY, {
          expiresIn: "42h",
        }),
      }),
      token = jwt.sign(
        { user_id: user._id, email: email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "42h",
        }
      );
    user.token = token;
    console.warn(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});
app.post("/login", urlencodedParser, async (req, res) => {
  console.warn(req.body);

  let user;
  try {
    let { login: name, email, password } = req.body;
    email = email.toLowerCase();
    // console.warn(login, email, password);
    if ((email || name) && password) {
      user = await User.findOne({ email: email, password: password });
      if (
        (user && user.password === password) ||
        (user && user.login === name)
      ) {
        console.log("User exists && password is correct");
        const token = jwt.sign(
          { user_id: user._id, email: email },
          process.env.TOKEN_KEY,
          { expiresIn: "42h" }
        );
        user.token = token;
        console.warn("user.user_id" + user._id);
        try {
          User.updateOne({ _id: user._id }, { $set: { token: token } });
          res.status(200).send({
            success: true,
            message: "Yes I did, yes I did",
            user: { user, token },
          });
          return;
        } catch (error) {
          console.error("Could't save the new token brrr" + error);
          res.status(418).send({
            success: false,
            message: "Could't save the new token brrr" + error,
            user: { user, token },
          });
        }

        res.cookie("jwt_token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true,
          path: "/",
          secure: false,
          sameSite: "none",
        });
        res.status(200).send({
          success: true,
          message: "User exists, password is correct",
          user: user,
        });
        return;
      }
      console.log("Invalid Credentials");
      res.status(400).json("Invalid Credentials");
    }
    // res.status(400).json("All input is required");
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong. Try again later",
    });
  }
});

app.all("/blog", async (req, res) => {
  let articles_blog = await db.collection("blog").find({}).toArray();
  res.status(200).json(articles_blog);
});
app.post(
  "/update_profile",
  upload.array("profile_picture", 1),
  async (req, res, next) => {
      let fileName = req.files[0].filename;
      
    console.warn("\n___________________\n");
    console.warn(req.body.email);
    console.warn(fileName);

    const query = User.where({ email: req.body.email });

    query.findOne(function (err, doc) {
      if (err) return handleError(err);
      if (doc) {
        console.warn(doc);
        // doc may be null if no document matched
      }
    });

    res.status(200).json(req.body.email);
  }
);
app.get("/file/:name", function (req, res, next) {
  let options = {
    root: path.join(__dirname, "images"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      // console.log("Sent:", fileName);
    }
  });
});

app.get("/profile", (req, res) => {
  let user;
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    // console.warn(login, email, password);
    if (email && password) {
      user = User.findOne({ email: email, password: password });
      if (user && user.password === password) {
        console.log("User exists && password is correct");
        const token = jwt.sign(
          { user_id: user._id, email: email },
          process.env.TOKEN_KEY,
          { expiresIn: "42h" }
        );
        user.token = token;
        console.warn("user.user_id" + user._id);
        try {
          User.updateOne({ _id: user._id }, { $set: { token: token } });
          res.status(200).send({
            success: true,
            message: "Yes I did, yes I did",
            user: { user, token },
          });
          return;
        } catch (error) {
          console.error("Could't save the new token brrr" + error);
          res.status(418).send({
            success: false,
            message: "Could't save the new token brrr" + error,
            user: { user, token },
          });
        }

        res.cookie("jwt_token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          httpOnly: true,
          path: "/",
          secure: false,
          sameSite: "none",
        });
        res.status(200).send({
          success: true,
          message: "User exists, password is correct",
          user: user,
        });
        return;
      }
      console.log("Invalid Credentials");
      res.status(400).json("Invalid Credentials");
    }
    // res.status(400).json("All input is required");
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong. Try again later",
    });
  }
  res.status(222).send(req.body);
});
app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome !");
});
app.use("*", (error, res) => {
  console.error(error);
  res.status(404).json({
    success: "false",
    message: "Page not found",
    erroror: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
module.exports = app;

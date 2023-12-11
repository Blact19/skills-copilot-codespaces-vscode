// Create web server application
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Add middleware to parse JSON data
app.use(bodyParser.json());

// Add middleware to parse URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Add middleware to allow cross-origin access
app.use(function (req, res, next) {
  // Allow access from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Allow access to headers from a browser
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");

  // Allow access to methods from a browser
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  next();
});

// Add REST API's
app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Create a new comment
app.post("/api/comments", function (req, res) {
  // Create a new comment and save to DB
  const comment = new Comment({
    name: req.body.name,
    comment: req.body.comment,
    stars: req.body.stars,
  });
  comment.save(function (err, comment) {
    if (err) return console.error(err);
    console.log("Saved document: " + comment);
    res.status(201).json(comment);
  });
});

// Get all comments
app.get("/api/comments", function (req, res) {
  // Get all comments from DB
  Comment.find(function (err, comments) {
    if (err) return console.error(err);
    res.status(200).json(comments);
  });
});

// Get a comment by ID
app.get("/api/comments/:id", function (req, res) {
  // Get comment from DB
  Comment.findById(req.params.id, function (err, comment) {
    if (err) return console.error(err);
    res.status(200).json(comment);
  });
});

// Update a comment by ID
app.put("/api/comments/:id", function (req, res) {
  // Find comment by ID and update
  Comment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, comment) {
      if (err) return console.error(err);
      res.status(200).json(comment);
    }
  );
});
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//static folder
//app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.all("/all", (req, res) => {
  res.send("Request for all methods");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/params/:id", (req, res) => {
  res.send(`Params with id = ${req.params.id}`);
});

app.get("/query", (req, res) => {
  res.send(`Query with ${JSON.stringify(req.query)}`);
});

//call back api, can have many callback in handlers
const cb = (req, res, next) => {
  console.log("Handling...");
  next();
};
app.get(
  "/callback",
  (req, res, next) => {
    console.log("Preparing...");
    next();
  },
  [cb],
  (req, res) => {
    console.log("Finishing");
    res.status(201).send("Callback");
  }
);

//download images
app.get("/download/:name", (req, res) => {
  res.download(path.join(__dirname, `public/images/${req.params.name}`));
});

app.get("/redirect", (req, res) => {
  res.redirect("http://localhost:3000");
});

//file not found handle
app.use((req, res, next) => {
  res.status(404).send("File not found");
});

app.listen(port, () => {
  console.log("Server is running...");
});

// ==========================
// Import Required Modules
// ==========================
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const app = express();  
const port = 3000;
const User = require("./models/customerschema");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// ==========================
// LiveReload Configuration
// ==========================
const liveReloadServer = livereload.createServer({ port: 35730 });
liveReloadServer.watch(path.join(__dirname, "public"));

app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// ==========================
// Routes - GET Requests
// ==========================

// Get Data form MongoDB To Home Page
app.get("/", async (req, res) => {
  try {
    const result = await User.find();
    res.render("index", { arr: result });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error");
  }
});

// Render Pages
app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/user/view.html", (req, res) => {
  res.render("user/view");
});

app.get("/user/edit.html", (req, res) => {
  res.render("user/edit");
});

app.get("/user/delete.html", (req, res) => {
  res.render("user/delete");
});

// ==========================
// Routes - POST Requests
// ==========================

// Add New User
app.post("/user/add.html", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Saving User");
  }
});

// ==========================
// MongoDB Connection
// ==========================
mongoose.connect(
  "mongodb+srv://mohamed2023hossam2023_db_user:agmy01276551887@cluster0.cqflfiv.mongodb.net/all-data?appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(` Server running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });
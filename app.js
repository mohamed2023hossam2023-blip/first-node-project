const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const allRoutes = require("./routes/allRoutes");

// ==========================
// LiveReload Configuration
// ==========================
// const liveReloadServer = livereload.createServer({ port: 35730 });
// liveReloadServer.watch(path.join(__dirname, "public"));

// app.use(connectLivereload());

// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// });

// ==========================
// MongoDB Connection
// ==========================
mongoose.connect(
    "mongodb+srv://mohamed2023hossam2023_db_user:agmy01276551887@cluster0.cqflfiv.mongodb.net/all-data?appName=Cluster0",
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

app.use(allRoutes);

const express = require('express')
const router = express.Router()
var moment = require("moment");
const User = require("../models/customerschema");
const UserController = require("../controllers/userController");

// ==========================
// Routes - GET Requests
// ==========================

// Get Data form MongoDB To Home Page
router.get("/", UserController.user_index_get);

// ==========================
// Render Pages for Adding, Editing, Deleting Users
// ==========================
router.get("/user/add.html", UserController.user_add_get);

router.get("/edit/:id", UserController.user_edit_get);

router.get("/user/delete.html", UserController.user_delete_get);

// =====================================
// Get User Details by ID To View Page
// =====================================
router.get("/view/:id", UserController.user_view_get);

// ==========================
// Post Request
// ==========================
// ==========================
//  Add New User
// ==========================
router.post("/user/add.html", UserController.user_post);

// ==========================
//  Search User
// ==========================
router.post("/search", UserController.user_search_post);

// ==========================
// delete request
// ==========================
router.delete("/edit/:id", UserController.user_delete);

// ==========================
//  Put request To Edit User Details
// ==========================
router.put("/edit/:id", UserController.user_put);

module.exports = router
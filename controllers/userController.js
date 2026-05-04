var moment = require("moment");
const User = require("../models/customerschema");


const user_index_get = (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Database Error");
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
};

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete_get = (req, res) => {
  res.render("user/delete");
};

const user_view_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error Saving User");
    });
};


const user_search_post = (req, res) => {
  const searchText = req.body.searchText.trim();
  User.find({
  $or: [
    { firstName: { $regex: searchText, $options: "i" } },
    { lastName: { $regex: searchText, $options: "i" } }
  ]
})
    .then((result) => {
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error Saving User");
    });
};

const user_delete =(req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
};

const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  user_index_get,
  user_add_get,
  user_edit_get,
  user_delete_get,
  user_view_get,
  user_post,
  user_search_post,
  user_delete,
  user_put
};

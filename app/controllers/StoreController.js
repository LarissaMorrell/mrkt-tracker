var mongoose = require("mongoose");
var Store = require("../models/store.js");
//controller object for CRUD operations
var storeController = {};

//show the list of stores
storeController.list = (req, res) => {
  Store.find({
    user: req.user._id
  })
    .exec()
    .then(stores => {
      res.render("../views/stores/index", { stores: stores, user: req.user });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
};

//show a store by ID
storeController.show = (req, res) => {
  Store.findById(req.params.id)
    .exec()
    //{ejsName: parameter}
    .then(store =>
      res.render("../views/stores/show", { store: store, user: req.user })
    )
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

//go to a new store creation page
storeController.getCreateForm = (req, res) => {
  res.render("../views/stores/create", { user: req.user });
};

// for saving a new store... redirects to create page
storeController.save = (req, res) => {
  const requiredFields = ["userId", "name"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Store.create({
    user: req.user._id,
    user_assigned_id: req.body.userId,
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    generalComments: req.body.generalComments,
    tier: req.body.tier,
    personnel: req.body.personnel,
    havePaperwork: req.body.havePaperwork,
    wantPaperworkBack: req.body.wantPaperworkBack,
    lastRedeemed: req.body.lastRedeemed
  })
    .then(store => {
      //then() takes in a function
      console.log("Successfully created a store");
      res.redirect("/stores/show/" + store._id);
    })
    .catch(err => {
      console.error(err);
      res.render("../views/stores/create", { user: req.user });
    });
};

//Go to the edit store page
storeController.edit = (req, res) => {
  Store.findOne({ _id: req.params.id }).exec(function(err, store) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/stores/edit", { store: store, user: req.user });
    }
  });
};

//edit store by ID... redirects to edit page
storeController.update = (req, res) => {
  // we only support a subset of fields being updateable
  const toUpdate = {};
  const updateableFields = [
    "user_assigned_id",
    "name",
    "address",
    "city",
    "state",
    "generalComments",
    "tier",
    "personnel",
    "havePaperwork",
    "wantPaperworkBack",
    "lastRedeemed"
  ];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Store.findByIdAndUpdate(
    req.params.id,
    { $set: toUpdate },
    { new: true },
    function(err, store) {
      if (err) {
        console.log("uh-oh...", err);
        res.render("../views/stores/edit", { store: req.body, user: req.user });
      }
      res.redirect("/stores/show/" + store._id);
    }
  );
};

//delete store by ID
storeController.delete = (req, res) => {
  Store.remove({ _id: req.params.id }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Store deleted!");
      res.redirect("/stores");
    }
  });
};

module.exports = storeController;

var mongoose = require("mongoose");
// var Store = mongoose.model("store");
var Store = require('../models/Store.js');
//controller object for CRUD operations
var storeController = {};


//show the list of stores
storeController.list = (req, res) => {
    Store
        .find()
        .exec()
        .then(stores => {
            res.render("../views/stores/index", {stores: stores});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
};

//show a store by ID
storeController.show = (req, res) => {
    Store
        .findById(req.params.id)
        .exec()
        //{ejsName: parameter}
        .then(store => res.render("../views/stores/show", {store: store}))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' })
        });
};

//go to a new store creation page
storeController.getCreateForm = (req, res) => {
    res.render("../views/stores/create");
}

// for saving a new store... redirects to create page
storeController.save = (req, res) => {
    const requiredFields = ['userId', 'name'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    Store
        .create({
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
        .then( store => { //then() takes in a function
            console.log("Successfully created an store.");
            res.redirect("/store/"+store._id);
        })
        .catch(err => {
            console.error(err);
            res.render("../views/stores/create");
        });
};

//Go to the edit store page
storeController.edit = (req, res) => {
    req.render("../views/stores/edit");
}


//edit store by ID... redirects to edit page
storeController.update = (req, res) => {
    // ensure that the id in the request path and the one in request body match
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = (
            `Request path id (${req.params.id}) and request body id ` +
            `(${req.body.id}) must match`);
        console.error(message);
        res.status(400).json({ message: message });
    }

    // we only support a subset of fields being updateable.
    // if the store sent over any of the updatableFields, we udpate those values
    // in document
    const toUpdate = {};
    const updateableFields = ['user_assigned_id', 'name', 'address', 'city',
        'state', 'generalComments', 'tier', 'personnel', 'havePaperwork',
        'wantPaperworkBack', 'lastRedeemed'
    ];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Store
        // all key/value pairs in toUpdate will be updated -- that's what `$set` does
        .findByIdAndUpdate(req.params.id, { $set: toUpdate })
        .exec()
        .then(store => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
};


//delete store by ID
storeController.delete = (req, res) => {
    Store
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(store => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));

    Store.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Store deleted!");
      res.redirect("/stores");
    }
  });

};

module.exports = storeController;
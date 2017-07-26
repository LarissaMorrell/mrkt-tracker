var Store = require("../controllers/StoreController.js");

module.exports = function(app, passport) {

    //get all of the stores
    app.get('/stores', Store.list);

    app.get('/storetest', (req, res) => {res.render('stores.ejs')})

    //get one store
    // app.get('/store/:id', Store.show);
    app.get('/stores/show/:id', Store.show);

    //Go to create a store page
    app.get('/stores/create', Store.getCreateForm);

    //Save a store
    app.post('/stores/save', Store.save);

    //Go to edit a store page
    app.get('/stores/edit/:id', Store.edit);

    //Update a store
    app.post('/stores/update/:id', Store.update);

    //Delete a store
    app.post('/stores/delete/:id', Store.delete);
}
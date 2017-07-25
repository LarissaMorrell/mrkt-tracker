var Store = require("../controllers/StoreController.js");

module.exports = function(app, passport) {

    //get all of the stores
    app.get('/stores', Store.list);

    app.get('/storetest', (req, res) => {res.render('stores.ejs')})

    //get one store
    app.get('/store/:id', Store.show);

    //Go to create a store page
    app.get('/stores/create', Store.getCreateForm);

    //Save a store
    app.post('/store', Store.save);

    //Go to edit a store page
    app.get('/store/edit/:id', Store.edit);

    //Update a store
    app.put('/store/:id', Store.update);

    //Delete a store
    app.post('/store/delete/:id', Store.delete);
}
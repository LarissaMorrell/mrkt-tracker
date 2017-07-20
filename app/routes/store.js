var Store = require('../models/store.js');

module.exports = function(app, passport) {

    // =====================================
    // STORES SECTION ======================
    // =====================================
    //get all of the stores
    app.get('/stores', (req, res) => {
    Store
        .find()
        .exec()
        .then(stores => {
            res.json(stores.map(store => store.apiRepr()));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'something went terribly wrong' });
        });
    });

    app.get('/storetest', (req, res) => {

        res.render('stores.ejs');
    })

    //get one store
    app.get('/store/:id', (req, res) => {
    Store
        .findById(req.params.id)
        .exec()
        .then(store => res.json(store.apiRepr()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' })
        });
    });

    app.post('/store', (req, res) => {
    const requiredFields = ['user_assigned_id', 'name'];
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
            user_assigned_id: req.body.user_assigned_id,
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
        .then(
            store => res.status(201).json(store.apiRepr()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        });
    });

    app.put('/store/:id', (req, res) => {
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
    });

    app.delete('/store/:id', (req, res) => {
    Store
        .findByIdAndRemove(req.params.id)
        .exec()
        .then(store => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Internal server error' }));
    });
}
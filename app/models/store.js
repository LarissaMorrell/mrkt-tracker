const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    user_assigned_id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    generalComments: { type: String },
    tier: { type: String },
    personnel: {
        type: Array
        // name: String,
        // position: String,
        // comment: String
    },
    havePaperwork: { type: Boolean },
    wantPaperworkBack: { type: Boolean },
    lastRedeemed: { type: Date }
});

storeSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        user_assigned_id: this.user_assigned_id,
        name: this.name,
        address: this.address,
        city: this.city,
        state: this.state,
        generalComments: this.generalComments,
        tier: this.tier,
        personnel: this.personnel,
        havePaperwork: this.havePaperwork,
        wantPaperworkBack: this.wantPaperworkBack,
        lastRedeemed: this.lastRedeemed
    };
}

// create the model for stores and expose it to our app
module.exports = mongoose.model('Store', storeSchema);

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    info              : {
        firstName: { type: String},
        lastName: { type: String},
        streetAddress: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        phone: { type: String },
        company: { type: String },
        position: { type: String },
        store_ids: { type: Array }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.virtual('address').get(function(){
    return `${this.info.streetAddress}, ${this.info.city}, ${this.info.state} ${this.info.zip}`
});

// how the user model is represented outside the server
userSchema.methods.apiRepr = function() {
    return {
        id: this._id,
        firstName: this.info.firstName,
        lastName: this.info.lastName,
        email: this.info.email,
        address: this.address,
        phone: this.info.phone,
        company: this.info.company,
        position: this.info.position,
        store_ids: this.info.store_ids
    };
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

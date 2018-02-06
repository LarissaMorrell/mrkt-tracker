var LocalStrategy = require("passport-local").Strategy;
var User = require("../app/models/user");
module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email", //default uses username, override with email
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      //passport automatically takes email/passport out of the req.body
      function(req, email, password, done) {
        process.nextTick(function() {
          // find a user whose email is the same as the forms email
          // check to see if the user trying to login already exists
          User.findOne({ "local.email": email }, function(err, user) {
            if (err) return done(err);
            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            } else {
              var newUser = new User();
              console.log("first name", req.body.firstName);
              // set the user's local credentials
              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);
              newUser.info.firstName = req.body.firstName;
              newUser.info.lastName = req.body.lastName;
              newUser.info.streetAddress = req.body.streetAddress;
              newUser.info.city = req.body.city;
              newUser.info.state = req.body.state;
              newUser.info.zip = req.body.zip;
              newUser.info.phone = req.body.phone;
              newUser.info.company = req.body.company;
              newUser.info.position = req.body.position;

              console.log(newUser);

              // save the user
              newUser.save(function(err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email", //default uses username, override with email
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // callback with email and password from our form

        // check to see if the user trying to login already exists
        User.findOne({ "local.email": email }, function(err, user) {
          if (err) return done(err);
          // if no user is found, return the message
          if (!user)
            return done(
              null,
              false,
              req.flash("loginMessage", "No user found.")
            );

          // if the user is found but the password is wrong
          if (!user.validPassword(password))
            return done(
              null,
              false,
              req.flash("loginMessage", "Oops! Wrong password.")
            );

          // all is well, return successful user
          return done(null, user);
        });
      }
    )
  );
};

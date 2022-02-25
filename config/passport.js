const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/user');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username', passwordField: 'password' },
      (username, password, done) => {
        // Match user
        User.findAll({ where: { user: username } })
          .then(users => {
            console.log(JSON.stringify(users));

            if (users == ''){
              return done(null, false, { message: 'That Email or Password incorrect' });
            }
            else{
              // Match password
              console.log(users[0].pass);
              bcrypt.compare(password, users[0].pass, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                  return done(null, users);
                } else {
                  return done(null, false, { message: 'Password incorrect' });
                }
              });
             }
          });
      })
  );

  passport.serializeUser((users, done) => {
    done(null, users[0].id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        // console.log('name = ' + user.name);
        // console.log('user = ' + user.user);
        done(null, user);
      })
  });

};

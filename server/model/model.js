const mongoose = require('mongoose');
const passport = require("passport");
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }
});
const User = mongoose.model('User', UserSchema);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new localStrategy(function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, {message: 'Incorrect username.'});

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if (res === false) return done(null, false, {message: 'Incorrect password.'});

            return done(null, user);
        });
    });
}));


const Contactschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneno: Number,
});

const ContactDB = mongoose.model('BusinessContacts', Contactschema);

exports.ContactDB = ContactDB;
exports.User = User;

const express = require('express');
const {User} = require("../model/model");
const bcrypt = require("bcrypt");
const passport = require('passport');
const router = express.Router();
const controller = require('../controller/controller.js');
const axios = require('axios');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/contact', (req, res) => {
    res.render('contact');
});
router.get('/projects', (req, res) => {
    res.render('projects');
});
router.get('/services', (req, res) => {
    res.render('services');
});
router.post('/message', (req, res) => {
    res.render('index')
});

router.get('/login', isLoggedOut, (req, res) => {
    const response = {
        title: "Login",
        error: req.query.error
    }
    res.render('login', response);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/businessContact',
    failureRedirect: '/login?error=true'
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/businessContact', isLoggedIn, (req, res) => {
    axios.get(`http://${req.headers.host}/api/add-contact`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            res.render('businessContact', {contacts: response.data});
        })
        .catch(err => {
            res.send(err);
        });
});
router.post('/businessContact', isLoggedIn, (req, res) => {
    res.redirect('/businessContact')
});

router.get('/add-contact', isLoggedIn, (req, res) => {
    res.render('add_contact');
})

router.get('/update-contact', isLoggedIn, (req, res) => {
    axios.get(`http://${req.headers.host}/api/add-contact`, {
        params: {id: req.query.id}, headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (contactdata) {
            res.render("update_contact", {contact: contactdata.data})
        })
        .catch(err => {
            res.send(err);
        })
});


// API
router.post('/api/add-contact', controller.create);
router.get('/api/add-contact', controller.find);
router.put('/api/contact/:id', controller.update);
router.delete('/api/contact/:id', controller.delete);

module.exports = router;
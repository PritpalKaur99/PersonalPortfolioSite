const express = require('express');
require('dotenv').config()
const port = process.env.PORT;
const path = require('path');
const morgan = require('morgan');
const views_path = path.join(__dirname, '/views/pages');
const public_path = path.join(__dirname, '../public');
const css = path.join(__dirname, '../node_modules/bootstrap/dist/css');
const js = path.join(__dirname, '../node_modules/bootstrap/dist/js');
const jquery = path.join(__dirname, '../node_modules/jquery/dist');
const connectDB = require('../server/database/connection');
const bodyparser = require("body-parser");
const router = require('../server/routes/router');
const passport = require('passport');
const session = require('express-session');
const app = express();

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}))

// set view engine
app.set("view engine", "ejs")

// setting middlewares
app.use(express.static(public_path));
app.use('/css', express.static(css)); //now /css is route for bootstrap css
app.use('/js', express.static(js)); //now /js is route for bootstrap js
app.use('/jquery', express.static(jquery)); //now /js is route for bootstrap js
app.set('view engine', 'ejs');
app.set('views', views_path);
app.use(express.json());


app.use(session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: true
}));

// Passport.js
app.use(passport.initialize());
app.use(passport.session());

// load routers
app.use('/', router)
app.listen(port, () => {
    console.log(`LISTENING TO SERVER on port ${port}`);
});

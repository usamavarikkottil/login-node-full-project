require("dotenv").config();
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");

const User = require("./models/user");
const userRoute = require("./routes/user");

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(session({
    secret: "thisissecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 999999999,
        rolling: true
    }
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




//db config
mongoose.connect("mongodb://localhost:27017/ejsLoginDB", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.once("open", () => {
    console.log("MongoDB connection successfull...");

});

//api routes

app.use("/", userRoute);

app.listen(5000, () => console.log('port 5000 started'));


let passport = require('passport');
let User = require('../models/users').User;

// Display the login page
module.exports.DisplayLogin = (req, res) => {
    // check to see if the user is not already logged in
    if (!req.user) {
        // render the login page
        res.render('auth/login', {
            title: "Login",
            games: '',
            messages: req.flash('error'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    } else {
        return res.redirect('/games'); // redirect to games list
    }
}

// Processes the login request
module.exports.ProcessLogin = () => {
    return passport.authenticate('local', {
        successRedirect: '/games',
        failureRedirect: '/users/login',
        failureFlash: true
    });
}

// Display the register page
module.exports.DisplayRegister = (req, res) => {
    // check to see if the user is not already logged in
    if (!req.user) {
        // render the registration page
        res.render('auth/register', {
            title: "Register",
            games: '',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    } else {
        return res.redirect('/games'); // redirect to games list
    }
}

// Processes the registration request
module.exports.ProcessRegister = (req, res) => {
    User.register(
        new User({
            username: req.body.username,
            //password: req.body.password,
            email: req.body.email,
            displayName: req.body.displayName
        }),
        req.body.password,
        (err) => {
            if (err) {
                console.log('Error inserting new user');
                if (err.name == "UserExistsError") {
                    req.flash('registerMessage', 'Registration Error: User Already Exists');
                }
                return res.render('auth/register', {
                    title: "Register",
                    games: '',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
            }
            // if registration is successful
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/games');
            });
        });
}

// Processes the logout
module.exports.ProcessLogout = (req, res) => {
    req.logout();
    res.redirect('/'); // redirect to the home page
}

module.exports.RequireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/users/login');
    next();
}
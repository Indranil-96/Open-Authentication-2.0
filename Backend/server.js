import express from 'express';
import passport from 'passport';
import { passportSetup } from './passport.config.js';
passportSetup();
import { connectDB } from './mongoDB.config.js';
import session from 'express-session';


// Initializing Express app....
const app = express();




// Setup Session....
// session will store data for 1hour in user session and one can get the data by <req.user> function or by <req.session.user>
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,        // 1 hour
        secure: false,                 // true if using HTTPS
        httpOnly: true                 // Prevents client-side JS from reading the cookie
    }
}));


// Using Middle wares
app.use(passport.initialize());
app.use(passport.session());


// API Routes.....

app.get("/", (req, res) => {
    return res.status(200).json({ Message: "Welcome to Home" })
})

app.get('/login', (req, res) => {
    return res.status(200).json({ Message: "Welcome to login screen" });
});


// auth with google
app.get('/google', passport.authenticate('google', { // authenticating using passport stratigy
    scope: ['profile']
}));

// CallbackURL with google to redirect..
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.status(200).json({ Message: "You have reached the callback rout", Data: req.user });
    res.redirect('/profile');
});

const authCheck = (req, res, next) => {
    if (!req.user) {
        // if user not loggedin the redirect 
        res.redirect('/login');
    } else {
        // if loggedin then call the next middle ware...
        next();
    }
}

// redirecting to profile....
app.get('/profile', authCheck, (req, res) => {
    res.status(200).json({ "Message": "Login Successfull welcome to your profile", Data: req.user });
})

app.get('/logout', (req, res) => {
    // handle with passport
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/'); // or send JSON if it's an API
    });

});


// Server And Database Connection .....

app.listen(3000, (err) => {
    if (err) {
        console.log("An error occured", err);
    } else {
        console.log("App is listining to the port 3000");
        connectDB();
    }
});
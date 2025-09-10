import express from 'express';
import passport from 'passport';
import { passportSetup } from './passport.config.js';
passportSetup();
import { connectDB } from './mongoDB.config.js';
import cookieSession from 'cookie-session';
import passport from 'passport';

const app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.SESSION_KEY // its a secret key like jwt secret key and have to store inside .env file
}));
app.use(passport.initialize());
app.use(passport.session());

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
    res.status(200).json({ Message: "You have reached the callback rout" });
})

app.get('/logout', (req, res) => {
    // handle with passport
});


app.listen(3000, (err) => {
    if (err) {
        console.log("An error occured", err);
    } else {
        console.log("App is listining to the port 3000");
        connectDB();
    }
});
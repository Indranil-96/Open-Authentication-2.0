import passport from "passport";
import googleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

const cid = process.env.CLIEN_ID;
const ckey = process.env.CLIENT_SECRET;

// console.log(cid)


passport.use(new googleStrategy({
    // option for google start
    clientId: cid, // client id 
    clientSecret: ckey, // client key
    callbackURL: "/auth/google/callback" // url taht we have declared in oAuth Concent Screen

}, () => {
    // it's a passport callbackfunction
}));

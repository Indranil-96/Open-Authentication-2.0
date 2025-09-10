import passport from "passport";
import googleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import MDB from "./LooseSchema.js";


passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    MDB.findById(id).then((user) => {
        cb(null, user)
    });
});


export const passportSetup = () => {
    // const cid = json.toString(process.env.CLIEN_ID);
    const cid = '5027136935-d6eeue4t12lkomi99touvrhaev889kmf.apps.googleusercontent.com';
    // const ckey = JSON.stringify(process.env.CLIENT_SECRET);
    const ckey = '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';

    passport.use(new googleStrategy({
        clientID: cid,
        clientSecret: ckey,
        callbackURL: 'http://localhost:3000/auth/google/redirect'

    }, (accessToken, refreshToken, profile, cb) => {
        // it's a passport callbackfunction
        // console.log(profile);

        MDB.findOne({ googleId: profile.id }).then((userData) => { // finding data by id
            if (userData) {

                console.log('User already exsist in database lets continue');
                cb(null, userData);

            } else { // create a new user if not exsist

                MDB.collection.insertMany([{ UserName: profile.diplayName }, { googleId: profile.id }, { photos: profile.photos }]).then((userData) => {
                    console.log("New User added successfully");
                    cb(null, userData);
                });
            }
        });
    }));
}


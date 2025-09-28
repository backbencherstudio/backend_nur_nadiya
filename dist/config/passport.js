import passport from "passport";
import { appCOnfig } from "./app.config";
import GoogleStrategy from 'passport-google-oauth20';
import { UserRepository } from "../common/repository/user/user.repository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
passport.use(new GoogleStrategy.Strategy({
    clientID: appCOnfig.oauth.google_client_id || "",
    clientSecret: appCOnfig.oauth.google_client_secret || "",
    callbackURL: appCOnfig.oauth.google_callback_url || ""
}, async function (accessToken, refreshToken, profile, cb) {
    // Google provides user's profile information
    // profile.id = Google user ID
    // profile.emails[0].value = user's email
    // profile.displayName = user's name
    // profile.photos[0].value = user's avatar URL
    // check if user already exists in the database
    try {
        let user = await UserRepository.checkUserExist("googleId", profile.id);
        // if user exist then log them in
        if (user) {
            return cb(null, user);
        }
        // check if user exists with the same email
        user = await UserRepository.checkUserExist("email", profile.emails[0].value);
        if (user) {
            user = await prisma.user.update({
                where: {
                    email: profile.emails[0].value
                },
                data: {
                    googleId: profile.id,
                    isGoogleVerified: true
                }
            });
            return cb(null, user);
        }
        // if user does not exist then create a new user
        user = await prisma.user.create({
            data: {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: '',
                role: 'user',
                googleId: profile.id,
                isGoogleVerified: true
            }
        });
        return cb(null, user);
    }
    catch (error) {
        return cb(error, null);
    }
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
export default passport;
//# sourceMappingURL=passport.js.map
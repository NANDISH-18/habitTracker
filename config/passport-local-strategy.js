const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async (email , password , done) => {
        // find a user and establish the identity
       const user = await User.findOne({email: email});
            
        if(!user || user.password != password){
            console.log('Invalid username/password');
            return done(null,false);
        }
        return done(null, user);
        
    }
))

// Serializing the user to decide which key in kept in the cookies
passport.serializeUser((user,done) => {
    done(null,user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(async (id,done) => {
    const user = await User.findById(id);
        // if(err){
        //     console.log('error in finding user--->passport');
        //     return done(err);
        // }
    if(!user){
        console.log('Error in finding user ---> passport');
            return done(null, false);
    }
    //// User found, return the user object
    return done(null, user);
    
})

// check if user is authenticate
passport.checkAuthentication = (req,res,next) => {
    // If the user is sign in , then pass on the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();

    }
    // if user is not sign in
    return res.redirect('/users/sign-up');

}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()) {
        // request.use contains the current signin user from the session cookie
        // and we are sending this to the local for views
        res.local.user = req.user;
    }
}


module.exports = passport;
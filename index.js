// import express module
const express = require('express');
const port = 8000;

const app = express();


//including mongodb configuration
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// Using flash library for showing user action notification
const flash = require('connect-flash');
const customware = require('./config/flashmiddleware');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')

const MongoStore = require('connect-mongo');


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


// middleware for static file accessing in assets directory
app.use(express.static('./assets'));


// setting view engine ejs
app.set('view engine','ejs');
app.set('views','./view');

// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'habbit tracker',
    // should change secret during before deployment in production
    secret: 'testpurpose',
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://nandishmohanty:Mohanty1818@cluster0.vugqe6n.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongodb setup OK');
        }
    )
}))


app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);



// connect flash
app.use(flash());
app.use(customware.setFlash);

// using express router
app.use('/',require('./routes/index'))

app.listen(port , (err)=> {
    if(err){
        console.log(`error in running on server ${port}`);
        return;
    }
    console.log(`server is running on port ${port}`);
})
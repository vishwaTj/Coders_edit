const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const env = require('./config/environment');

const port = 800;
const db = require('./config/mongoose');


//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require("connect-mongo");

// require the sass middleware
const sassMiddleware = require('node-sass-middleware');

// connect flash package
const flash = require('connect-flash');

//include the middleware created by us for  logout message
const customMware = require('./config/middleware');

// setup the server to be used with socket.io
const ChatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(ChatServer);
ChatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

const passportJWT  = require('./config/passport-jwt-strategy');

app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug : false, // to detect errors
    outputStyle : 'extended', // the display of the output inmultiple or single lines
    prefix : '/css' // telling the server where to look for css files
}))

// we forgot to add middle ware to read post requests
app.use(express.urlencoded());

app.use(cookieParser());

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use('/assets',express.static(__dirname + '/assets'));


// including the layouts file
const expressLayouts = require('express-ejs-layouts');

// include passport google for it to wotk
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const { isExternal } = require('util/types');

// function to access the layouts
app.use(expressLayouts);


app.use(express.json());

// extract style and script from subpages into the layouts to give their individual behaviour
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.use(express.static('./assets'));

// setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo  store is used to store the session cookie in the db
app.use(session({
    name : 'codeial',
    //Todo change the secret before deployment n production mode
    secret : env.session_cookie_key,
    saveUninitialized : false,
    resave : false,
    cookie:{
        maxAge : (1000 * 60 * 100) // how long will the session be valid for and then it will expire (in ms)
    },
    store: MongoStore.create({
        //options)
    // store : new MongoStore({
       mongoUrl : "mongodb://0.0.0.0:27017/codeial_development",
        autoremove : "disabled",
    },function(err){
        console.log("error at mongo store",err || "connection established to store cookie");
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use flash after session because it uses session cookies
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server ${err}`);
        return;
    }
    console.log(`Server is running on port:${port}`);  
});
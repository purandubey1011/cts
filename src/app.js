// .env configuration
require('dotenv').config({ path: './.env' });
// import express
let express = require("express");
let app = express();

// use database
require('./models/database.js').connectDatabase()

// logger
app.use(require('morgan')('tiny'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(cookieparser());
    
// index routes
app.use('/api/v1/user/', require('./routes/index.routes.js'))
app.use('/api/v1/roadmap/', require('./routes/roadmap.routes.js'))

// Error handling 
const ErrorHandler = require('./utils/ErrorHandler.js');
const { generatedErrors } = require('./middlewares/error.js');
app.use("*",async(req, res, next) => {
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use(generatedErrors)

// server listen 
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
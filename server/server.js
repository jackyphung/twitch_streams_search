// server.js
// dependencies import
// this is where we call up anything our server 
// depends on in its initial configuration
const webpack = require('webpack');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

// this is where we 
const apiRoutes = {
  default: require('./routes/api/api.default'),
  auth: require('./routes/api/auth'),
};

// require the main route for the app
// the main route will be used to render the index.html 
// to all routes besides apiRoutes
const appRoute = require('./routes/app');

// express view egine setup
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// express static file path setup
// this is where we will store our views and public files 
app.set('views', path.join(__dirname, '../client/public'));
app.use(express.static(path.join(__dirname, '../client/public')));

// more express setup code
// not sure how to explain this one, but we need it
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// MongoDb Connection
// mongoose.connect(process.env.DB_DEV,  { useNewUrlParser: true, dbName: process.env.DB_NAME });
// mongoose.set('useFindAndModify', false);

// backend api routes
// this is where we declare our API routes
// and also apply the routers that we specified above
app.use('/api/auth', apiRoutes.auth);
app.use('/api/', apiRoutes.default);

// application route
app.use('/', appRoute);

// export our express application
module.exports = app;
// server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userRoutes = require('./api/users');


router.use((req, res, next) => {
  next();
});

router.get('*', (req, res) => {
  res.render('index');
});

module.exports = router;
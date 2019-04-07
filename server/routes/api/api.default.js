// server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use((req, res, next) => {
  next();
});

router.get('*', (req, res) => {
  res.contentType("application/json");
  res.send(JSON.stringify({ message: "Invalid API Route" }));
});

module.exports = router;
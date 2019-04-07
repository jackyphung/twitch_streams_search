const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../../models/user');
const { Auth } = require('../../utils');

/* User Authentication Route */
router.post('', (req, res, next) => {
  res.contentType("application/json");
  let authInfo = null;
  console.log(req.body);
  User.findOne({ username: new RegExp(`^${req.body.username}$`, 'i') }, (err, account) => {
    if (err) throw err;

    console.log(account);
    if (account == undefined || account == null) {
      res.send(JSON.stringify({ message: "Invalid Credentials" }));
    } else if (account.password === req.body.password) {
      authInfo = {
        _id: account._id,
        username: account.username,
        role: account.user_role
      };

      payload = { "_id": account._id, "role": account.user_role }
      authInfo.authToken = Auth.generateToken(payload);
      res.send(JSON.stringify(authInfo));
    }
  });
});

router.post('/create', (req, res, next) => {
  res.contentType("application/json");
  let values = req.body;
  if (values && Object.keys(values).length > 0 && values.username) {
    console.log('CREATE: account with username: ' + values.username);
    let user = User(values);
    user.save((err, doc) => {
      if (err)
        throw err;

      console.log(`Created new account: ${values.username}`);
      res.send(JSON.stringify(doc));
    });
  } else {
    res.send(JSON.stringify({ message: "Invalid CREATE Query for Account" }));
  }
});

module.exports = router;
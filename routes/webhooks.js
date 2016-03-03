'use strict';

var express             = require('express');
var router              = express.Router();
var MandrillSlackWebhook = require('../models/mandrill-slack-webhook');
var validateMandrill    = require('../utils/validate-mandrill');

router.post('/mandrill', function(req, res, next) {
  new MandrillSlackWebhook(req)
    .sendAllMessages(process.env.SLACK_URL)
    .then(
      data => {
        // handle success case;
      },
      err => {
        // handle error case;
      }
    );

//  return next(req.body);
});

module.exports = router;

'use strict';

var express             = require('express');
var router              = express.Router();
var MandrillSlackWebhook = require('../models/mandrill-slack-webhook');

router.post('/mandrill', function(req, res, next) {
  console.log('1');
  console.log(new MandrillSlackWebhook(req));

  var message = new MandrillSlackWebhook(req, process.env.MANDRILL_WEBHOOK_KEY, process.env.MANDRILL_WEBHOOK_ENDPOINT);
  console.log(message);

  message.sendAllMessages(process.env.SLACK_URL)
    .then(
      data => {
        console.log('2');
        next(data);
        // handle success case;
      },
      err => {
        console.log('3');

        // handle error case;
      }
    );

//  return next(req.body);
});

module.exports = router;

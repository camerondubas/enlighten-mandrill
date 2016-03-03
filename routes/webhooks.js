'use strict';

var express             = require('express');
var router              = express.Router();
var MandrillSlackWebhook = require('../models/mandrill-slack-message');
var validateMandrill    = require('../utils/validate-mandrill');

router.post('/mandrill', function(req, res, next) {
  let message = new MandrillSlackMessage();
  if (!validateMandrill(req.body, req.get('X-Mandrill-Signature'))) {
    var error = {
      message: 'Error Validating X-Mandrill-Signature',
      status: 401
    };

    return next(error);
  }
if (req.body.mandrill_events) {
  var events = JSON.parse(req.body.mandrill_events);

  events.forEach(event => {
    var message = new MandrillSlackMessage(event.event, event.msg);

    message.sendWebhookMessage(process.env.SLACK_URL);
  }, this);
}

 return next(req.body);
});

module.exports = router;

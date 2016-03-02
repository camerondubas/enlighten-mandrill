'use strict';

var express             = require('express');
var router              = express.Router();
var SlackMessage        = require('../models/slack-message');
var MandrillEvent       = require('../models/mandrill-event');
var validateMandrill    = require('../utils/validate-mandrill');

router.post('/mandrill', function(req, res, next) {
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
    var mandrillEvent = new MandrillEvent(event.event, event.msg);
    var slackMessage = new SlackMessage(mandrillEvent.message);

    slackMessage.sendWebhookMessage(process.env.SLACK_URL);
  }, this);
}

 return next(req.body);
});

module.exports = router;

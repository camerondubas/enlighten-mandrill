'use strict';

var express             = require('express');
var router              = express.Router();
var SlackMessage        = require('../models/slack-message');
var MandrillEvent       = require('../models/mandrill-event');

router.post('/mandrill', function(req, res, next) {
  if (!req.get('X-Mandrill-Signature') || req.get('X-Mandrill-Signature') !== process.env.MANDRILL_SIGNATURE) {
    var e = new Error();
    e.status = 401;
    return next(e);
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

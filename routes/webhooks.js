'use strict';

var express             = require('express');
var router              = express.Router();
var SlackMessage        = require('./models/slack-message');
var mandrillEventTypes  = require('./utils/mandrill-event-types');

router.post('/mandrill', (req, res) => {
  var events = JSON.parse(req.body.mandrill_events);

  events.forEach(event => {
    let message = {
      username: mandrillEventTypes[event.event] || mandrillEventTypes['default'],
      text: `It was sent to ${event.msg.email}`,
      iconEmoji: ":email:"
    }

    new SlackMessage(message).sendWebhookMessage(process.env.SLACK_URL);
  }, this);

   res.send(req.body);
});

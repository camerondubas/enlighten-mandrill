'use strict';

var express             = require('express');
var router              = express.Router();
var SlackMessage        = require('../models/slack-message');
var mandrillEventTypes  = require('../utils/mandrill-event-types');

router.post('/mandrill', function(req, res, next) {
  if (!req.get('X-Mandrill-Signature') || req.get('X-Mandrill-Signature') !== process.env.MANDRILL_SIGNATURE) {
    var e = new Error();
    e.status = 401;
    next(e);
  }
if (req.body.mandrill_events) {
  var events = JSON.parse(req.body.mandrill_events);

  events.forEach(event => {
    let message = {
      username: mandrillEventTypes[event.event] || mandrillEventTypes['default'],
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${event.msg.email}`,
          "color": "danger",
          "fields": [
            {
              "title": 'Sent To',
              "value": event.msg.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": event.msg.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": event.msg.diag || "No description provided.",
              "short": false,
            }
          ],

        }

      ]
    };

    new SlackMessage(message).sendWebhookMessage(process.env.SLACK_URL);
  }, this);
}

 next(req.body);
});

module.exports = router;

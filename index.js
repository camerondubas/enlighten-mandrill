'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var app = express();
var configPath = './.config.js';

try {
    fs.accessSync(configPath, fs.F_OK);
    require(configPath);
} catch (e) {
    // It isn't accessible
    // TODO: Error handling
}

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Slack Mandrill</h1>');
});

app.post('/webhooks/mandrill', (req, res) => {
  var events = JSON.parse(req.body.mandrill_events);

  events.forEach(event => {
    if (event.event === 'hard_bounce') {
      let message = {
        "text": `It was sent to ${event.msg.email}`,
        "username": "An Email Just Bounced",
        "icon_emoji": ":email:"
      };

      request.post({
        url: process.env.SLACK_URL || null,
        json: true,
        body: message
      }, (err, httpResponse, body) => {
        // TODO: Error Handling/onComplete Function
      });
    }
  }, this);

   res.send(req.body);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

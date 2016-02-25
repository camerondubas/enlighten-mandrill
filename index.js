'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var app = express();
var env = process.env.NODE_ENV || "development";

if (env === "development") {
  try {
    let configPath = './.config.js';
    fs.accessSync(configPath, fs.F_OK);
    require(configPath);
  } catch (e) {
    new Error('You must include a configuration file for local development');
    process.exit();
  }
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
    let eventTypes = {
      "hard_bounce": "An Email Just Hard-Bounced",
      "soft_bounce": "An Email Just Soft-Bounced",
      "reject": "An Email Was Just Rejected",
      "default": "An Email Just Had An Issue"
    };

    let message = {
      "username": eventTypes[event.event] || eventTypes['default'],
      "text": `It was sent to ${event.msg.email}`,
      "icon_emoji": ":email:",
    };

    request.post({
      url: process.env.SLACK_URL || null,
      json: true,
      body: message
    }, (err, httpResponse, body) => {
      // TODO: Error Handling/onComplete Function
    });
  }, this);

   res.send(req.body);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

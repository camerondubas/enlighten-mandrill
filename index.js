var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Slack Mandrill</h1>');
});

app.post('/webhooks/mandrill', (req, res) => {
  console.log('POST Received');
  var events = req.body.mandrill_events;
  var slackMessage;
  events.forEach(event => {
    if (event.event === 'hard_bounce') {
      slackMessage = {
        "text": `It was sent to ${event.msg.email}`,
        "username": "An Email Just Bounced",
        "icon_emoji": ":email:"
      };
    }
  }, this);

  request.post({
    url:'https://hooks.slack.com/services/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',
    json: true,
    body: slackMessage
  }, function(err,httpResponse,body){
      console.log('Post Complete');
      console.log(err);
      console.log(body);
  });

   res.send(req.body);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

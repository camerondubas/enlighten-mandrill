var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>Slack Mandrill</h1>');
});

app.post('/test', (req, res) => {
   console.log('POST Received');
   console.log(req.body);
   res.send();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

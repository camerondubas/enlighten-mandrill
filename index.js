var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8008;

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

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

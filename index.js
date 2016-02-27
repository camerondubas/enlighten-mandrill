'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var routes      = require('./routes');

var app = express();

// Config Setup
require('./utils/get-config');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

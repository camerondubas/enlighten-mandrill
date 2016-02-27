'use strict';

var fs        = require("fs");
var path      = require("path");
var express   = require('express');
var router    = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Slack Mandrill</h1>');
});


// Go through all the files in routes, and add each
// eg user.js --makes url--> /user/
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach(file => {
    let route = file.replace(path.extname(file), '');
    router.use('/' + route, require('./' + route));
  });

// catch 404 and forward to error handler
router.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;

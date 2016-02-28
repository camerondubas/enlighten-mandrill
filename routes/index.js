'use strict';

var fs        = require("fs");
var path      = require("path");
var express   = require('express');
var router    = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('<h1>Slack Mandrill</h1>');
});


// Go through all the files in routes, and add each
// eg user.js --makes url--> /user/
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js"))
  .forEach(file => {
    let route = file.replace(path.extname(file), '');
    router.use('/' + route, require('./' + route));
  });


// Catch 404
router.use((req, res, next) => res.status(404).send(`<h1>Error 404: Cannot ${req.method} ${req.url}.</h1>`));

module.exports = router;

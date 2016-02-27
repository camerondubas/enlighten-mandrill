'use strict';
var fs = require('fs');

const env = process.env.NODE_ENV || "development"

if (env === "development") {
  try {
    let configPath = '../.config.js';
    fs.accessSync(configPath, fs.F_OK);
    require(configPath);
  } catch (e) {
    new Error('You must include a configuration file for local development');
    process.exit();
  }
}

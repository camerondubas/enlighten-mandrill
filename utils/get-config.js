'use strict';
var fs = require('fs');

const env = process.env.NODE_ENV || "development"
const configPath = '../.config.js';

if (env === "development") {
  try {
    require(configPath);
  } catch (e) {
    throw new Error(`You must include a configuration file for local development. Cannot find module ${configPath}.`);
    process.exit();
  }
}

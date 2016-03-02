'use strict';
var crypto = require('crypto');

module.exports = function (params, signature) {
  console.log('Validate-Mandrill');
  let webhookKey = process.env.MANDRILL_WEBHOOK_KEY;
  let webhookEndpoint = process.env.MANDRILL_WEBHOOK_ENDPOINT;

  let validationUrl = webhookEndpoint;

  // TODO: Sort params alphabetically
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      validationUrl += key + params[key];
    }
  };

  let signer = crypto.createHmac('sha1', webhookKey);
  let testSignature = signer.update(validationUrl).digest('base64');
  console.log(testSignature);
  console.log(signature);
  return signature === testSignature ? true : false;
}

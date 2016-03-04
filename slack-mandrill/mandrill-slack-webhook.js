'use strict';

var stringOperations = require('./string-operations');
var messageTemplates = require('./mandrill-slack-message-templates');
var crypto = require('crypto');
var request = require('request');

class MandrillSlackWebhook {
  constructor(req, mandrillKey, mandrillEndpoint) {
    this.body = req.body;
    this.signature = req.get('X-Mandrill-Signature');
    this.mandrillKey = mandrillKey;
    this.mandrillEndpoint = mandrillEndpoint;
    this.messages = [];

    try {
      let events = JSON.parse(this.body.mandrill_events) || [];
      events.forEach(event => this.addMessage(event));

    } catch (error) {
      console.log(error);
    }

  }

  addMessage(event) {
    this.messages.push(
      messageTemplates[stringOperations.toCamelCase(event.event) || 'default'](event.msg)
    );
  }


  sendAllMessages(url) {
    return new Promise((resolve, reject) => {
      if (this.validateRequest()) {
        this.messages.forEach(message => this.sendWebhookMessage(message, url));
        resolve(this.messages);
      } else {
        // Handle Error Case
        var error = {
          message: 'Error Validating X-Mandrill-Signature',
          status: 401
        };

        reject(error);
      }

    })
  }

  sendWebhookMessage(message, url) {
    return new Promise((resolve, reject) => {
        request.post({
        url: url || null,
        json: true,
        body: message
        }, (err, httpResponse, body) => {
        // TODO: Error Handling/onComplete Function
          resolve(body || null);
        });
    })
  }


  validateRequest() {
    let validationUrl = this.mandrillEndpoint;

    // TODO: Sort params alphabetically
    for (let key in this.body) {
      if (this.body.hasOwnProperty(key)) {
        validationUrl += key + this.body[key];
      }
    };

    try {
      let signer = crypto.createHmac('sha1', this.mandrillKey);
      let testSignature = signer.update(validationUrl).digest('base64');
      return this.signature === testSignature ? true : false;

    } catch (error) {
      return false;
    }
  }
};


module.exports = MandrillSlackWebhook;

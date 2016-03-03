'use strict';

var stringOperations = require('../utils/string-operations');
var crypto = require('crypto');
var request = require('request');

class MandrillEvent {
  constructor(request) {
    this.body = request.body;
    this.signature = request.get('X-Mandrill-Signature');
    this.messages = [];

    if (this.validateRequest()) {
      let events = JSON.parse(this.body.mandrill_events) || [];
      events.forEach(event => this.addmessage(event));
    } else {
      // Handle Error Case
      var error = {
        message: 'Error Validating X-Mandrill-Signature',
        status: 401
      };

      throw error;
    }
  }

  addEvent(event) {
    this.messages.push(
      this[stringOperations.toCamelCase(event.event) || 'default'](event.message)
    );
  }

  hardBounce(message) {
    return {
      username: "An Email Just Hard-Bounced",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${message.email}`,
          "color": "danger",
          "fields": [
            {
              "title": 'Sent To',
              "value": message.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": message.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": message.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
    };
  }

  softBounce(message) {
    return {
      username: "An Email Just Soft-Bounced",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${message.email}`,
          "color": "warning",
          "fields": [
            {
              "title": 'Sent To',
              "value": message.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": message.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": message.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
    };
  }

  reject(message) {
    return {
      username: "An Email Was Just Rejected",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${message.email}`,
          "color": "danger",
          "fields": [
            {
              "title": 'Sent To',
              "value": message.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": message.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": message.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
    };
  }

  default(message) {
    return {
      username: "An Email Just Had An Issue",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${message.email}`,
          "color": "warning",
          "fields": [
            {
              "title": 'Sent To',
              "value": message.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": message.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": message.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
    };
  }


  sendAllMessages() {
    this.messages.forEach(message => this.sendWebhookMessage(message));
  }

  sendWebhookMessage(message, url) {
    return new Promise((resolve, reject) => {
        request.post({
        url: url || null,
        json: true,
        body: message
        }, (err, httpResponse, body) => {
        // TODO: Error Handling/onComplete Function
            resolve(body || null)
        });
    })
  }


  validateRequest() {
    let webhookKey = process.env.MANDRILL_WEBHOOK_KEY;
    let webhookEndpoint = process.env.MANDRILL_WEBHOOK_ENDPOINT;

    let validationUrl = webhookEndpoint;

    // TODO: Sort params alphabetically
    for (let key in this.body) {
      if (this.body.hasOwnProperty(key)) {
        validationUrl += key + this.body[key];
      }
    };

    try {
      let signer = crypto.createHmac('sha1', webhookKey);
      let testSignature = signer.update(validationUrl).digest('base64');
      return this.signature === testSignature ? true : false;

    } catch (error) {
      return false;
    }
  }
};


module.exports = MandrillEvent;

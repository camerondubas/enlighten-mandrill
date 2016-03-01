'use strict';

var stringOperations = require('../utils/string-operations');

class MandrillEvent {
  constructor(type, message) {
    this.message = this[
      stringOperations.toCamelCase(type) || 'default'
    ](message);
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

};


module.exports = MandrillEvent;

'use strict';

class MandrillSlackMessageTemplates {
  static hardBounce(message) {
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
    }
  };

  static softBounce(message) {
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

  static reject(message) {
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

  static default(message) {
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
}


module.exports = MandrillSlackMessageTemplates;

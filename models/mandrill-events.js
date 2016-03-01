'use strict';

let MandrillEventTypes = {
  "hard_bounce": {
      username: "An Email Just Hard-Bounced",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${event.msg.email}`,
          "color": "danger",
          "fields": [
            {
              "title": 'Sent To',
              "value": event.msg.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": event.msg.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": event.msg.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
    },
  "soft_bounce": {
      username: "An Email Just Soft-Bounced",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${event.msg.email}`,
          "color": "danger",
          "fields": [
            {
              "title": 'Sent To',
              "value": event.msg.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": event.msg.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": event.msg.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
    },
  "reject": {
     username: "An Email Was Just Rejected",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${event.msg.email}`,
          "color": "danger",
          "fields": [
            {
              "title": 'Sent To',
              "value": event.msg.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": event.msg.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": event.msg.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
  },
  "default": {
     username: "An Email Just Had An Issue",
      text: '',
      icon_emoji: ":email:",
      attachments: [
        {
          "fallback": `It was sent to ${event.msg.email}`,
          "color": "danger",
          "fields": [
            {
              "title": 'Sent To',
              "value": event.msg.email,
              "short": true,
            },
            {
              "title": 'Subject',
              "value": event.msg.subject,
              "short": true,
            },
            {
              "title": 'Error Description',
              "value": event.msg.diag || "No description provided.",
              "short": false,
            }
          ]
        }
      ]
  }
};

module.exports = MandrillEventTypes;

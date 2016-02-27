'use strict';

var request = require('request');

class SlackMessage {
  constructor(msg) {
    this.message = {
      "username": msg.username || undefined,
      "text": msg.text || undefined,
      "icon_emoji": msg.iconEmoji || undefined,
    };
  }

  sendMessage(url) {
    return new Promise((resolve, reject) => {
        request.post({
        url: url || null,
        json: true,
        body: this.message
        }, (err, httpResponse, body) => {
        // TODO: Error Handling/onComplete Function
            resolve(body || null)
        });
    })
  }
}

module.exports = SlackMessage;

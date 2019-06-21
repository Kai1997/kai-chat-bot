const APP_SECRET = '2a944ab7f2a57e7f5cc96df47c209e3b';
const VALIDATION_TOKEN = '123123123';
const PAGE_ACCESS_TOKEN = 'EAAMfa7fNnRcBAIdq22JyJ5CeCowgISqx8lYT8jLqGmi0ZADb6AVu2f9ORnzlToZAWZBlwzuVGE86LtxQ51dzJDVtSfUBD5i3rfiJOh7W2zS2gAqeKv1epWqAaxxwafbLR9KEWEH7tdNUdDyA14Up0ZBj44kl4QLrc9RJkbpAgZCyryup6gDE2';

var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');


var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

var request = require("request");

app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook', function(req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook', function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        if (message.message.text=="hello") {
          sendMessage(senderId, "Hello!! ");
        } 
        if (message.message.text=="lịch học") {
            sendMessage(senderId, "Học cả ngày ");
          }

      }
    }
  }
  res.status(200).send("OK");
});

// Đây là function dùng api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      },
    }
  });
}

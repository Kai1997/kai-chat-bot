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
        var text = message.message.text;
        if (text=="hello" || text == "hi") {
          sendMessage(senderId, "Hello ");
        } 
        if (text=="lịch làm việc" || text=="lịch " || text=="lịch tuần" || text=="lịch trong tuần " ) {
            sendMessage(senderId, "Thứ 3 : Lau sàn ,nấu ăn chiều; Thứ 4: Tưới nước , đi chợ ,nấu ăn; Thứ 5 : lau sàn ;Thứ 6 : nấu ăn");
        }
        if (text=="học" || text == "lịch học" || text == "lịch học tiếng nhật" || text == "học tiếng nhật" ) {
          sendMessage(senderId, "Tối các thứ trong tuần vào lúc 7h tối. Thứ 2 học từ vựng. Thứ 3 học ngữ pháp . Thứ 4 làm bài. Thứ 5 học từ vựng .Thứ 6 học ngữ pháp. Thứ 7  làm bài ");
        } 
        if (text=="người yêu" || text == "ny tôi là ai") {
          sendMessage(senderId, "kai nè <3 ");
        } 

      }
    }
  }
  res.status(200).send("OK");
});

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

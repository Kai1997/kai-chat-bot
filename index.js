const APP_SECRET = '2a944ab7f2a57e7f5cc96df47c209e3b';
const VALIDATION_TOKEN = '123123123';
const PAGE_ACCESS_TOKEN = 'EAAMfa7fNnRcBAIdq22JyJ5CeCowgISqx8lYT8jLqGmi0ZADb6AVu2f9ORnzlToZAWZBlwzuVGE86LtxQ51dzJDVtSfUBD5i3rfiJOh7W2zS2gAqeKv1epWqAaxxwafbLR9KEWEH7tdNUdDyA14Up0ZBj44kl4QLrc9RJkbpAgZCyryup6gDE2';
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAGx/uoTjszG6E\nHsibQ6ZvQRXJm8M1vMIRMPPX04obpgnLKckFjwY40+n0z+wpZTRAsAUHhF2TaTSC\ncJGJIm8JTqvVLgHz1Zl3C7+a4yLmAEd22KwJe1EQJDM4SkaSn0UxndDX/JevnmML\n9VVV5hgAHuG7p/fEOIiI9jJDA/PloQIFxQJ6RUUaI/fm3eu0wyDHK0Sc5/cAlZlN\nQbtz85JATRp9/iv3DObt7LEyN98kRXm8xFBRfuOsLqIBrDUs/U9ODkIFr85c5Jac\nFsHD28eImOXG+VGlB2fiem3ZxGVyNbCWREY3iveojVkznWTmAHATrR9VHUp9iXaW\n33DeFqnxAgMBAAECggEAG3HUmEgepI/ZKxVlxe6+gI7tEKoo04zFseSLNZaCWMxa\nAlUUI6/o7OXzetbYj5pmgmZTNZ12q+hgCNGRrSSG9e6wFErYGxB1NgFu7G8OLYs1\nKniubUVZkaOGUMClv+0ymrHH5A9xUTTgxBTWzeiLHbtLtv46YqVL9jsr95CBP9kG\ntIbivPY2hTe4tPZNh0WW4vuneaeQ9egqc4HTP5AbwiBEY0vQDmj632D4/jOkxKaw\nrvnPGg+5zKVBmAiNkA9/ywsZDmOSQdJ/ked15JwtQOh4apUUeToeJSfIhj6QLB7R\n6McIIkoqVhJsPtbjqoQyy4S4Sj7w8QxcjDTqsuQZ1QKBgQD4mQUFrCLNWiedMBjj\nqBOnUaAA74uX3KykIDJ6yJm7U9uQDjQ2lRdAyqjffQsURV9rGtWp83IPmhamQ0q/\nRmHAJ2e8uRCBAzN1k+YJ0u/jc1w/LMpC3CbY63XSUIuTLTEilD/z0jzLAPagZGd2\nZY4xNAvrXPvsUJUm6jANqho2hQKBgQDF03yMDmI+kLKC7flDM+lm3UXpWZilEbXN\n0Zk6oTX4oV/Q0HPTwlOr9y32Yf0kb7LCsPwC54hKOj6Vk+Z4yga9EIUQhvJrRc6X\n6Z0kvAvS4dx8TVoPGPlnC1zZqD1Qi6E2T7K/jStStzG13qmKvt9mztrP1CQ0082S\nPpzImctPfQKBgQC0wW5pZXQYpEjRfjtarMc9jZgtlf+F+Cp/W/nYVSuSjbLD19AX\nL+isb67CcYUwxBBRLD3XSO/ScFOvqJYc5ewFb6F6E4XwiIdOIq/MzNcoJqUYOlUG\nsFR+vRX6Sh5ycRWc8vZdLqyNXrH0hYzFBaqSFCnmhMGYXi9VEErIZLqSkQKBgQCr\nN7nqNmDNqcr3CyTcB0gRoZ3qs4MsC0IBG1G1ruXZhUI6ptA5DU4B3nPHdVP1fz+G\nxku379DD/dlA+LtW+/QNGwkwHrweIFMIpEdADgllwdplM0WpH4Jsrybzs2suFUu4\niA47P+GpO6koscinr0AH6Sz1B7U2i8K2ur5T2NhguQKBgGSOP23IrbMG7EvcVYnA\nsRnRY+Qj1ILvyRa3JjN7eEMTY3dXf5UrJor4ZB7bkaH8Wuz7APUaBI0XWsKojCs/\nykPgCDTNr6fTOFb20JhDfSfx0LZmLregrY21zayzArX+NyMvEIR95UNF7tGZOJ4Q\nRK7H56SpQHnlH2f0KInM74Ii\n-----END PRIVATE KEY-----\n";
const client_email = "chatbot@onlineeatsbot-okuooi.iam.gserviceaccount.com";
const project_id = "onlineeatsbot-okuooi";
const dialogflow = require('dialogflow');
const LANGUAGE_CODE = 'en-US';
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require("request");

const config = {
  credentials: {
    private_key: private_key,
    client_email: client_email
  }
}
const sessionClient = new dialogflow.SessionsClient(config);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

sendMessage("2307959022584072", " LỊCH NGÀY MAI " + getMyDate() + " " + getTomorrow());
sendMessage("2892699947443175", " LỊCH NGÀY MAI " + getMyDate() + " " + getTomorrow());
resFromDialog("2307959022584072", getMyDate())
resFromDialog("2892699947443175", getMyDate())




app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/webhook', function (req, res) { // Đây là path để validate tooken bên app facebook gửi qua
  if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook', async function (req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  var entries = req.body.entry;
  const sessionPath = sessionClient.sessionPath(project_id, "12123");

  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        var text = message.message.text;
        // const request = {
        //   session: sessionPath,
        //   queryInput: {
        //     text: {
        //       text: text,
        //       languageCode: LANGUAGE_CODE
        //     }
        //   }
        // }
        // if (typeof text === 'string' || text instanceof String) {

        //   let responses = await sessionClient.detectIntent(request)
        //   let mss = responses[0].queryResult.fulfillmentMessages[0].text.text[0];
        //   sendMessage(senderId, mss);
        // } else {
        //   sendMessage(senderId, "oh no, quá khả năng của mình rồi.");
        // }
        if (typeof text === 'string' || text instanceof String) {
          if (text == 'hôm nay' || text == 'hom nay' || text == 'Hôm nay') {
             resFromDialog(senderId, getToday());
          } else if (text == 'Xem lịch' || text == 'xem lịch' || text == 'lịch học'|| text == 'Lịch học'|| text == 'lịch'|| text == 'Lịch') {
             sendQuickReply(senderId, text);
          } else if (text == 'Ngày mai' || text == 'ngày mai' || text == 'Mai') {
             sendQuickReply(senderId, " LỊCH NGÀY MAI " + getMyDate() + " " + getTomorrow());

          } else {

             resFromDialog(senderId, text)
          }
        } else {
           sendQuickReply(senderId, "oh no, quá khả năng của mình rồi.");
          // await sendQuickReply(senderId, text);

        }

      }
    }
  }
  res.status(200).send("OK");
});


async function resFromDialog(senderId, text) {
  const sessionPath = sessionClient.sessionPath(project_id, "12123");
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: LANGUAGE_CODE
      }
    }
  }
  let responses = await sessionClient.detectIntent(request)
  let mss = responses[0].queryResult.fulfillmentMessages[0].text.text[0];
  sendQuickReply(senderId, mss);
  // await sendQuickReply(senderId, text);


}

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


function sendQuickReply(senderId, message) {
  request({
    url: 'https://graph.facebook.com/v6.0/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN,
    },
    method: 'POST',
    json: {
      recipient: {
        id: senderId
      },
      messaging_type: "RESPONSE",
      message:{
        text:message,
        quick_replies:[
          {
            content_type:"text",
            title:"Hôm nay",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
          },
          {
            content_type:"text",
            title:"Thứ 2",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
          },
          {
            content_type:"text",
            title:"Thứ 3",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
          },
          {
            content_type:"text",
            title:"Thứ 4",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
          },
          {
            content_type:"text",
            title:"Thứ 5",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
          },
          {
            content_type:"text",
            title:"Thứ 6",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
          },
          {
            content_type:"text",
            title:"Thứ 7",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
          },
          {
            content_type:"text",
            title:"Chủ nhật",
            payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
          }
        ]
      }
    }
  });
}
function getMyDate() {
  // Khai báo đối tượng Date
  var date = new Date();

  // Lấy số thứ tự của ngày hiện tại
  var current_day = date.getDay();

  // Biến lưu tên của thứ
  var day_name = '';

  // Lấy tên thứ của ngày hiện tại
  switch (current_day) {
    case 0:
      day_name = "Thứ hai";
      break;
    case 1:
      day_name = "Thứ ba";
      break;
    case 2:
      day_name = "Thứ tư";
      break;
    case 3:
      day_name = "Thứ năm";
      break;
    case 4:
      day_name = "Thứ sáu";
      break;
    case 5:
      day_name = "Thứ bảy";
      break;
    case 6:
      day_name = "Chủ nhật";
  }
  return day_name;
}
function getToday() {
  // Khai báo đối tượng Date
  var date = new Date();

  // Lấy số thứ tự của ngày hiện tại
  var current_day = date.getDay();

  // Biến lưu tên của thứ
  var day_name = '';

  // Lấy tên thứ của ngày hiện tại
  switch (current_day) {
    case 0:
      day_name = "Chủ nhật";
      break;
    case 1:
      day_name = "Thứ hai";
      break;
    case 2:
      day_name = "Thứ ba";
      break;
    case 3:
      day_name = "Thứ tư";
      break;
    case 4:
      day_name = "Thứ năm";
      break;
    case 5:
      day_name = "Thứ sau";
      break;
    case 6:
      day_name = "Thứ bảy";
  }
  return day_name;
}

function getTomorrow() {
  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  return day + "/" + month + "/" + year;
}
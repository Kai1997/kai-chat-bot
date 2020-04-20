const APP_SECRET = '2a944ab7f2a57e7f5cc96df47c209e3b';
const VALIDATION_TOKEN = '123123123';
const PAGE_ACCESS_TOKEN = 'EAAMfa7fNnRcBAIdq22JyJ5CeCowgISqx8lYT8jLqGmi0ZADb6AVu2f9ORnzlToZAWZBlwzuVGE86LtxQ51dzJDVtSfUBD5i3rfiJOh7W2zS2gAqeKv1epWqAaxxwafbLR9KEWEH7tdNUdDyA14Up0ZBj44kl4QLrc9RJkbpAgZCyryup6gDE2';
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAGx/uoTjszG6E\nHsibQ6ZvQRXJm8M1vMIRMPPX04obpgnLKckFjwY40+n0z+wpZTRAsAUHhF2TaTSC\ncJGJIm8JTqvVLgHz1Zl3C7+a4yLmAEd22KwJe1EQJDM4SkaSn0UxndDX/JevnmML\n9VVV5hgAHuG7p/fEOIiI9jJDA/PloQIFxQJ6RUUaI/fm3eu0wyDHK0Sc5/cAlZlN\nQbtz85JATRp9/iv3DObt7LEyN98kRXm8xFBRfuOsLqIBrDUs/U9ODkIFr85c5Jac\nFsHD28eImOXG+VGlB2fiem3ZxGVyNbCWREY3iveojVkznWTmAHATrR9VHUp9iXaW\n33DeFqnxAgMBAAECggEAG3HUmEgepI/ZKxVlxe6+gI7tEKoo04zFseSLNZaCWMxa\nAlUUI6/o7OXzetbYj5pmgmZTNZ12q+hgCNGRrSSG9e6wFErYGxB1NgFu7G8OLYs1\nKniubUVZkaOGUMClv+0ymrHH5A9xUTTgxBTWzeiLHbtLtv46YqVL9jsr95CBP9kG\ntIbivPY2hTe4tPZNh0WW4vuneaeQ9egqc4HTP5AbwiBEY0vQDmj632D4/jOkxKaw\nrvnPGg+5zKVBmAiNkA9/ywsZDmOSQdJ/ked15JwtQOh4apUUeToeJSfIhj6QLB7R\n6McIIkoqVhJsPtbjqoQyy4S4Sj7w8QxcjDTqsuQZ1QKBgQD4mQUFrCLNWiedMBjj\nqBOnUaAA74uX3KykIDJ6yJm7U9uQDjQ2lRdAyqjffQsURV9rGtWp83IPmhamQ0q/\nRmHAJ2e8uRCBAzN1k+YJ0u/jc1w/LMpC3CbY63XSUIuTLTEilD/z0jzLAPagZGd2\nZY4xNAvrXPvsUJUm6jANqho2hQKBgQDF03yMDmI+kLKC7flDM+lm3UXpWZilEbXN\n0Zk6oTX4oV/Q0HPTwlOr9y32Yf0kb7LCsPwC54hKOj6Vk+Z4yga9EIUQhvJrRc6X\n6Z0kvAvS4dx8TVoPGPlnC1zZqD1Qi6E2T7K/jStStzG13qmKvt9mztrP1CQ0082S\nPpzImctPfQKBgQC0wW5pZXQYpEjRfjtarMc9jZgtlf+F+Cp/W/nYVSuSjbLD19AX\nL+isb67CcYUwxBBRLD3XSO/ScFOvqJYc5ewFb6F6E4XwiIdOIq/MzNcoJqUYOlUG\nsFR+vRX6Sh5ycRWc8vZdLqyNXrH0hYzFBaqSFCnmhMGYXi9VEErIZLqSkQKBgQCr\nN7nqNmDNqcr3CyTcB0gRoZ3qs4MsC0IBG1G1ruXZhUI6ptA5DU4B3nPHdVP1fz+G\nxku379DD/dlA+LtW+/QNGwkwHrweIFMIpEdADgllwdplM0WpH4Jsrybzs2suFUu4\niA47P+GpO6koscinr0AH6Sz1B7U2i8K2ur5T2NhguQKBgGSOP23IrbMG7EvcVYnA\nsRnRY+Qj1ILvyRa3JjN7eEMTY3dXf5UrJor4ZB7bkaH8Wuz7APUaBI0XWsKojCs/\nykPgCDTNr6fTOFb20JhDfSfx0LZmLregrY21zayzArX+NyMvEIR95UNF7tGZOJ4Q\nRK7H56SpQHnlH2f0KInM74Ii\n-----END PRIVATE KEY-----\n";
const client_email= "chatbot@onlineeatsbot-okuooi.iam.gserviceaccount.com";
const project_id= "onlineeatsbot-okuooi";
const dialogflow = require('dialogflow');
const LANGUAGE_CODE = 'en-US';
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
const config = {
			credentials: {
				private_key: private_key,
				client_email: client_email
			}
		}
const sessionClient = new dialogflow.SessionsClient(config);

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

app.post('/webhook', async function(req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
  var entries = req.body.entry;
  const sessionPath = sessionClient.sessionPath(project_id, "12123");

  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        var text = message.message.text;
         const request = {
			session: sessionPath,
			queryInput: {
				text: {
					text: text,
					languageCode: LANGUAGE_CODE
				}
			}
		}
		sendMessage(senderId, "đây");
        if (typeof text === 'string' || text instanceof String) {

		let responses = await sessionClient.detectIntent(request)	
		let mss = responses[0].queryResult.fulfillmentMessages[0].text.text[0];
		sendMessage(senderId, mss);
		sendMessage(senderId, typeof senderId);
        } else {
        	sendMessage(senderId, "oh no, quá khả năng của mình rồi.");
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

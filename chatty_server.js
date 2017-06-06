const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');

const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


//send message back to all users on client side
function broadcast(data) {
  for(let client of wss.clients) {
    client.send(JSON.stringify(data));
  }
}

//send # of online users to client
function onlineUsers(data) {
  let numClients = {
    type: 'numUsers',
    data
  }
 broadcast(numClients);
}

// Set up a callback that will run whe na client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  const numClients = wss.clients.size;

  onlineUsers(numClients);

  //randomly generate hex color code
  const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);

  ws.on('message', function incoming(message) {
    const parsedMessage = JSON.parse(message);

    //check if image ends in one of the formats, if matches assign the type to "imageMessage"
    const checkImage = /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i;

    if (checkImage.test(parsedMessage.content)) {
      parsedMessage.type = 'imageMessage'
    }

    //change type for messages recieved by server
    switch(parsedMessage.type) {
      case "postMessage":
        parsedMessage.type = "incomingMessage";
        break;
      case "postNotification":
        parsedMessage.type = "incomingNotification";
        break;
    }

    //assign unique ID to each message
    const id = uuidV4();
    const username = parsedMessage.username;
    const content = parsedMessage.content;
    const type = parsedMessage.type;
    //asign random color to each user
    const color = randomColor;

    //rebuild message and send back to client
    const messageBody = { id, type, color, username, content };
    broadcast(messageBody)

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineUsers(wss.clients.size);
  });

});





import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [],
      userCount: 0
    }

    this.socket = new WebSocket('ws://localhost:3001');

    this.onNewMessage = this.onNewMessage.bind(this)
  }

  //sends to server
  onNewMessage(content, username) {
    const oldName = this.state.currentUser.name;
    let newMessage = {};

    if (oldName !== username) {

      newMessage = {
        type: 'postNotification',
        content: `${oldName} changed their name to ${username}`
      }

      const data = JSON.stringify(newMessage);
      this.socket.send(data);
      this.setState({ currentUser: { name: username }});

    }

    newMessage = {
      username: username || "Anonymous",
      type: 'postMessage',
      content: content
    }

    const data = JSON.stringify(newMessage)
    this.socket.send(data);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = (evt) => {
      console.log('connected to server');
    }

    this.socket.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      const { type, data, color } = parsedMessage;

      if(type === 'numUsers') {
        this.setState({ userCount: data })
      } else {
        //append new messages onto existing set of messages
        this.setState({ messages: this.state.messages.concat(parsedMessage) })
      }
    }
  }

  render() {
    const { currentUser, messages } = this.state;
    return (
      <div>
        <nav className="user-count">
          <span>
            { this.state.userCount } online
          </span>
        </nav>
        <MessageList messages = { messages } />
        <ChatBar
          onNewMessage = { this.onNewMessage }
        />
      </div>
    );
  }
}


export default App;
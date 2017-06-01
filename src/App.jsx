import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: []
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
      this.setState({currentUser: {name: username}});
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
      const messageData = JSON.parse(message.data)
     //clone and store new message without changing original state
      const messages = Object.assign([], this.state.messages)
      // const messages = [..._this.state.messages]
      messages.push(messageData);
      this.setState ({
        messages: messages
      })

    }
  }

  render() {
    const { currentUser, messages } = this.state;
    return (
      <div>
        <nav className="navbar-brand"> </nav>
        <MessageList messages = { messages } />
        <ChatBar
          currentUser = { currentUser }
          onNewMessage = { this.onNewMessage }
        />
      </div>
    );
  }
}


export default App;
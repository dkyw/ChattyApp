import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    }

    this.onNewMessage = this.onNewMessage.bind(this)
    this.socket = new WebSocket('ws://localhost:3001')
  }

  onNewMessage(content, username) {
    const newMessage = {
      username: username || this.state.currentUser.name,
      content: content
    }

    // this.setState({
    //   messages: this.state.messages.concat(newMessage)
    // })

    const data = JSON.stringify(newMessage)
    this.socket.send(data);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = function (evt) {
      console.log('connected to server');
    }

    this.socket.onmessage = (message) => {

      const messages = Object.assign([], this.state.messages)
      // const messages = [..._this.state.messages]

      messages.push(JSON.parse(message.data));
      console.log(messages);

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
          onNameChange = { this.onNameChange }
        />
      </div>
    );
  }
}


export default App;
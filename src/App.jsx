import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


const uniqueID = require('uuid/v4');

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
      id: uniqueID(),
      username: username || this.state.currentUser.name,
      content: content
    }
    this.setState({
      messages: this.state.messages.concat(newMessage)
    })
    const data = JSON.stringify(newMessage)
    this.socket.send(data);
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = function (evt) {
      console.log('connected to server');
    }

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
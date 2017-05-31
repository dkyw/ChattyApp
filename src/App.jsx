import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.onNewMessage = this.onNewMessage.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
  }


  onNewMessage(content) {
    const newMessage = {id: this.state.messages.id, username: this.state.currentUser.name, content: content }
    this.setState({
      messages: this.state.messages.concat(newMessage)
    })
  }

  onNameChange(username) {
    this.setState({currentUser: {name: username}})
  }

  render() {
    const { currentUser, messages } = this.state;
    return (
      <div>
        <nav className="navbar-brand"> </nav>
        <MessageList messages = { messages } />
        <ChatBar
          // currentUser =  { this.state.currentUser }
          currentUser = { currentUser }
          onNewMessage = { this.onNewMessage }
          onNameChange = { this.onNameChange }
        />
      </div>
    );
  }
}


export default App;
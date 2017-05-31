import React, { Component } from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: ''
    }
  }


  onKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content, this.state.username);
      this.setState ({
        content: '',
        username: '',
      })
    }
  }

  onMessageChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onNameChange = (event) => {
    // this.props.onNameChange(event.target.value);
    this.setState({ username: event.target.value });
  }


  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          onChange= { this.onNameChange }
          value = { this.state.username }
           />
          }
        <input
          className="chatbar-message"
          placeholder ="Type a message and hit ENTER"
          onKeyDown= { this.onKeyPress }
          onChange = { this.onMessageChange }
          value ={ this.state.content }
          />
      </footer>
    )
  }
}

export default ChatBar;
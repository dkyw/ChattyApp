import React, { Component } from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
      }
    }

  onKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content);
      this.setState ({ content: '' })
    }
  }

  onMessageChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onNameChange = (event) => {
    this.props.onNameChange(event.target.value);
  }


  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={ this.props.currentUser ? this.props.currentUser.name : undefined}
          onChange={ this.onNameChange }
           />
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
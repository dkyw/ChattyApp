import React, { Component } from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: ''
    }
  }


  //record state of the each keypress
  onMessageChange = (event) => {
    this.setState({ content: event.target.value });
  }

  onNameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  //on enter , retrieve current state/username content and pass to onNewMessage function
  onKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.onNewMessage(this.state.content, this.state.username);
      this.setState ({
        content: ''
      })
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          //invoke onNameChange for every keystroke to update state
          onChange= { this.onNameChange }
          value = { this.state.username }
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
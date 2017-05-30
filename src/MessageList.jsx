import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    const message = this.props.messages.map(message => {
      return (
        <Message
          key = { message.id }
          username = { message.username }
          content = { message.content }
        />
      )
    });

    return (
      <div id='Message-List'>
        {message}
      </div>
    );
  }
}


export default MessageList;




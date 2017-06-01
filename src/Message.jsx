import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type === "postMessage") {
      return (
        <main className='messages'>
          <div className="message">
            <span className="message-username"> { this.props.username }</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        </main>
      );

    } else if (this.props.type === 'postNotification') {
      return (
        <main className='messages'>
          <div class="message system">{this.props.content}</div>
        </main>
      );
    }
  }
}

export default Message;



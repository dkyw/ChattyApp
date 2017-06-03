import React, {Component} from 'react';

class Message extends Component {
  parseType() {
    switch(this.props.type) {

      case 'incomingMessage':
        return(
          <div className="message">
            <span className="message-username"> { this.props.username }</span>
            <span className="message-content">{this.props.content}</span>
          </div>
        )
        break;

      case 'incomingNotification':
        return (<div className="message system">{this.props.content}</div>);
        break;

      case 'imageMessage':
        return (
          <div className="message">
            <span className="message-username"> { this.props.username }</span>
            <img className="message-image" src={ this.props.content }/>
          </div>
        );
        break;
    }
  }

  render() {
    return (
      <main className='messages'>{ this.parseType() }</main>
    );
  }
}

export default Message;



import React, {Component} from 'react';

class Message extends Component {
  //depending on the the type of message recieved from server, render different bodies for each case
  parseType() {
  const {username, content, color} = this.props;
    switch(this.props.type) {
      case 'incomingMessage':
        return(
          <div className="message">
            <span className="message-username" style={{ color }}> { username }</span>
            <span className="message-content">{ content }</span>
          </div>
        )
        break;

      case 'incomingNotification':
        return (<div className="message system">{ content }</div>);
        break;

      case 'imageMessage':
        return (
          <div className="message">
            <span className="message-username" style={{ color }}> { username }</span>
            <img className="message-image" src={ content }/>
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



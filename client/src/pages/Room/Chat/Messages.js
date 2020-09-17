import React from 'react';

const Messages = ({ messages, user }) => {
  return (
    <div className="messages">
      {messages.map((message, index) => {
        if (message.type === 'notification') {
          return (<p key={index} className="notification">{message.event}</p>)
        }
        if (!message.id || message.id === user.id) {
          return (<MessageOut key={index} message={message} />)
        }
        return (<MessageIn key={index} message={message} />)
      })}
    </div>
  )
}

const MessageOut = ({ message }) => {
  return (
    <div className='lineWrapperOut'>
      <div>
        {message && <p className='messageOut'>{message.body}</p>}
        <p className='myName'>{message.name}</p>
      </div>
      {message && <img src={require("../../../data/avatars/" + message.avatar + ".png")} className='avatar' alt='avatar' />}
    </div>
  )
}

const MessageIn = ({ message }) => {
  return (
    <div className='lineWrapperIn'>
      <img src={require("../../../data/avatars/" + message.avatar + ".png")} className='avatar' alt='avatar' />
      <div>
        <p className='messageIn'>{message.body}</p>
        <p className='senderName'>{message.name}</p>
      </div>
    </div>
  )
}

export default Messages;
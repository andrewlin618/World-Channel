import React from 'react';

const Messages = ({ messages, user }) => {
  return (
    <div className="messages">
      {messages.map((message, index) => {
        if (message.type === 'notification') {
          return (<p key={index} className="notification">{message.event}</p>)
        }
        if (message.id === user.id) {
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
      <p style={{ color: "rgba(0,0,0,0.5)" }}>me</p>
      {message && <p className='messageOut'>{message.body}</p>}
      {message && <img src={require(`../../../data/avatars/${message.avatar}.png`)} className='avatar' alt='avatar' />}
    </div>
  )
}

const MessageIn = ({ message }) => {
  return (
    <div className='lineWrapperIn'>
      <img src={require(`../../../data/avatars/${message.avatar}.png`)} className='avatar' alt='avatar' />
      <p className='messageIn'>{message.body}</p>
      <p style={{ color: "rgba(0,0,0,0.5)" }}>{message.name}</p>
    </div>
  )
}

export default Messages;
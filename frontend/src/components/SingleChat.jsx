import React from 'react'
import './SingleChat.css'

const SingleChat = ({message , from}) => {
    
  return (
    <div className={`${from === 'Me' ? 'single-chat-main-container-right' : 'single-chat-main-container-left'}`}>
        <div className={`${from === 'Me'? 'single-chat-right' : 'single-chat-left'}`}>{message}</div>
    </div>
  )
}

export default SingleChat
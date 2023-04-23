import React from 'react'
import './FloatingMenu.css'
import {showUsers} from './AllUsers'
const FloatingMenu = () => {
  return (
    <div className='floating-menu' onClick={()=>{showUsers.value? showUsers.value = false : showUsers.value = true}}>
        <span  style={{transform: `${showUsers.value? 'scale(1.3)' : ''}`}}>{showUsers.value? '-' : '+'}</span>
    </div>
  )
}

export default FloatingMenu
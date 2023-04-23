import React from 'react'
import './AllUsers.css'
import { userToken } from '../signals/userToken'
import { useEffect , useState } from 'react'
import axios from 'axios'
import img from '../assets/me.png'
import { signal } from "@preact/signals-react"

export const showUsers = signal(false)
const Users = () => {
  const [users, setusers] = useState([{}])
  const getUsers = async () => {
    const res = await axios.get(`http://localhost:3000/users/${userToken.value.username}`)
    console.log(res)
    setusers(res.data)
  }
  
  useEffect(() => {
    getUsers()
  },[])
  
  return (
    <div className='users-main-container'>
      {users.map((user ,key) => {return(
        <div key={key} className='users-container'>
          <div className='dp-wrapper'>
            <img src={img} alt="dp" />
          </div>
          <div className='name-wrapper'>
            <b>{user.username}</b> 
            <small>Status</small>
          </div>
        </div>
      )})}

    </div>
  )
}

export default Users
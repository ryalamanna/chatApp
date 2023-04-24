import React from 'react'
import './AllUsers.css'
import { userToken } from '../signals/userToken'
import { useEffect , useState } from 'react'
import axios from 'axios'
import img from '../assets/me.png'
import { signal } from "@preact/signals-react"
import { isChatOpen , partnerName , partnerId , chatMessages} from '../signals/chatRelated'
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

  const handleOpenChat = (id ,name)=>{
    isChatOpen.value = true;
    partnerName.value = name;
    partnerId.value = id;
    chatMessages.value = [];
}
  
  return (
    <div className='users-main-container'>
      {users.map((user ,key) => {return(
        <div key={key} className='users-container' onClick={()=>{handleOpenChat(user.user_id , user.username)}}>
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
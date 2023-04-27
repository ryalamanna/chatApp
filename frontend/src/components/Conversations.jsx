import React from 'react'
import './Conversations.css'
import img from '../assets/me.png'
import { useEffect , useState } from 'react'
import axios from 'axios'
import { userToken } from '../signals/userToken'
import {renderConv} from '../signals/chatRelated'
import { isChatOpen , partnerName , partnerId} from '../signals/chatRelated'
const Conversations = () => {

    const [convs, setconvs] = useState([])

    const getConversations = async ()=>{
        try{
            const res = await axios.get(`http://localhost:3000/conv/${userToken.value.user_id}`)
            if(res.data.message !== 'No conversations'){
                setconvs(res.data)
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getConversations();
    }, [])

    useEffect(()=>{
        getConversations();
    } , [renderConv.value])

    const handleOpenChat = (id ,name)=>{
        isChatOpen.value = true;
        partnerName.value = name;
        partnerId.value = id;
    }
    
  return (
            <div  className='Conv-main-container'>
            {
                convs.map((conv , key) => {
                    return(
                            <div key={key}  className='users-container' onClick={()=>{handleOpenChat(conv.conversation_partner_id , conv.conversation_partner_name)}}>
                                <div className='dp-wrapper'>
                                    <img src={img} alt="dp" />
                                </div>
                                <div className='name-wrapper'>
                                    <b>{conv.conversation_partner_name}</b> 
                                    <small>{conv.last_message}</small>
                                </div>
                            </div>
                    )
                })
            }
            </div>
            
            
    
  )
}

export default Conversations
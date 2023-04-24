import React from 'react'
import './Chat.css'
import { useEffect , useRef } from 'react'
import {chatMessages} from '../signals/chatRelated'
import SingleChat from './SingleChat'
import axios from 'axios'
import {userToken} from '../signals/userToken';
import { partnerId , last_displayed_timestamp   } from '../signals/chatRelated'
import { debounce } from 'lodash';
const Chat = () => {


    const chatWindowRef = useRef(null);

    function scrollToBottom() {
        if(chatWindowRef.current !== null)
             chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }


    const getMessages = async ()=>{
      try{
          const res = await axios.get(`http://localhost:3000/messages/${userToken.value.user_id}/${partnerId.value}`)
          if(chatMessages.value !== res.data){
            if(res.data.message !== "No messages"){
              chatMessages.value = res.data;
            }
          }
      }catch(err){
          console.log(err);
      }finally{
          scrollToBottom();
      }
  }
    useEffect(() => {
   
      getMessages();
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages.value])
    

    var isUpdating = false;
    const updateChat = async () => {
      if (isUpdating) {
        return;
      }
      isUpdating = true;
      try {
        const res = await axios.get(
          `http://localhost:3000/messages/updateChat/${userToken.value.user_id}/${partnerId.value}/${last_displayed_timestamp}`
        );
        if (res.data.message !== "No messages" && res.data.length > 0) {
          chatMessages.value = [...chatMessages.value, ...res.data];
          last_displayed_timestamp.value = res.data[res.data.length - 1].created_on;
        } else {
            return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        isUpdating = false;
      }
    };
    
    const debouncedUpdateChat = debounce(updateChat, 100);

    setInterval(() => {
      debouncedUpdateChat();
    }, 100);
    
    
  return (
    <div className='chat-main-container' ref={chatWindowRef}>
    {   chatMessages.value != [] && 
        chatMessages.value.map((o , key)=>{
            last_displayed_timestamp.value = o.created_on;
            return <SingleChat key={key}  from={o.sender_id === userToken.value.user_id ? 'Me' : 'Other'} message={o.content}/>
        })
    }
    </div>
  )
}

export default Chat
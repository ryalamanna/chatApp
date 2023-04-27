import './Login.css';
import SingleChat from './SingleChat';
import messages from '../signals/loginMessages'
import { useEffect , useRef } from 'react'
import {scrollDown} from '../signals/loginMessages'
const Chat = () => {

  const loginWindowRef = useRef(null);
  function scrollToBottom() {
    if(loginWindowRef.current !== null)
         loginWindowRef.current.scrollTop = loginWindowRef.current.scrollHeight;
}

useEffect(()=>{
  scrollToBottom()
}, [ messages.value])

  return (
    <div className='login-main-container' ref={loginWindowRef}>
        {
            messages.value.map((o , key)=>{
                return <SingleChat key={key} from={o.from} message={o.message}/>
            })
        }
    </div>
  )
}

export default Chat
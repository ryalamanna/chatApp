// import React , {useContext, useEffect , useState} from 'react'
import './Header.css';
import meimg from '../assets/me.png'
import { isLogedin } from '../signals/loginMessages';
import { isChatOpen , partnerName} from '../signals/chatRelated';
const Header = () => {
  
    
  return (
    <div className='header-main-container'>
        {isChatOpen.value && 
        <>
        <div className='back-btn' onClick={()=>{isChatOpen.value = false;}}>
          &#8592;
        </div>
        <div className='dp-container '>
            <img className='dp' src={meimg} alt="" />
        </div>

        <div className='name-container'>
           <b>{partnerName.value}</b>
        </div>
        </>}
        {!isChatOpen.value && <b className='app-name'>{isLogedin.value ? 'WhatsYAAP' : 'Login' }</b>}
    </div>
  )
}

export default Header
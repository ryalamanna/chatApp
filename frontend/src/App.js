import './App.css';
// import { useState , createContext } from 'react'
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import { isLogedin } from './signals/loginMessages';
// import Users from './components/Users';
import FloatingMenu from './components/FloatingMenu';
import AllUsers from './components/AllUsers';
import {showUsers} from './components/AllUsers'
import Conversations from './components/Conversations';
import Chat from './components/Chat';
import { isChatOpen } from './signals/chatRelated';
// export const FromContext = createContext();
// export const MessageContext = createContext();
// export const SendContext = createContext();
function App() {

// const [from, setFrom] = useState('Me')
// const  updateFrom = (value)=>{
//     setFrom(value)
//   }

// const [message, setMessage] = useState('')
// const  updateMessage = (value)=>{
//     setMessage(value)
//   }

// const [send, setSend] = useState(1)
// const  updateSend = (value)=>{
//     setSend(value)
//   }

  return (
    // <SendContext.Provider value={{send , updateSend}}>
    // <MessageContext.Provider value={{message , updateMessage}}>
    // <FromContext.Provider value={{from , updateFrom}}>
      <div className="main-container">
        <Header/>
        {isChatOpen.value && <Chat/>}
        {showUsers.value && <AllUsers/>}

        {isLogedin.value && <FloatingMenu/>}
        {isLogedin.value && <Conversations/>}
        <Login/>
        <Footer/>
      </div>
    // </FromContext.Provider>
    // </MessageContext.Provider>
    // </SendContext.Provider>
  );
}

export default App;

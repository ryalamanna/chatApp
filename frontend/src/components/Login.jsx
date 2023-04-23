import './Login.css';
import SingleChat from './SingleChat';
import messages from '../signals/loginMessages'
const Chat = () => {

  return (
    <div className='login-main-container'>
        {
            messages.value.map((o , key)=>{
                return <SingleChat key={key} from={o.from} message={o.message}/>
            })
        }
    </div>
  )
}

export default Chat
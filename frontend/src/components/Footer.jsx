import React, { useState } from 'react';
import './Footer.css';
import message from '../signals/loginMessages';
import axios from 'axios';
import { signal } from '@preact/signals-react';
import { userToken } from '../signals/userToken';
import { isLogedin } from '../signals/loginMessages';
import { isChatOpen } from '../signals/chatRelated';
import { partnerId  } from '../signals/chatRelated';
const userData = signal({
    username: '',
    password: '',
});
const Footer = () => {
    const [input, setinput] = useState('');
    const [writing, setWriting] = useState('option');

    const CheckLogin = async () => {
        const res = await axios.post(
            'http://localhost:3000/users/login',
            userData.value
        );
        if (res.data.message === 'User not found') {
            console.log('User not found');
        } else if (res.data.message === 'Wrong password') {
            console.log('Wrong password');
        } else if (res.data.message === 'Login successfull') {
            isLogedin.value = true;
            console.log('Login successfull');
            userToken.value = res.data.userToken;
        }
    };

    const handleRegister = async () => {
        console.log(userData.value);
        const res = await axios.post(
            'http://localhost:3000/users/register',
            userData.value
        );
        console.log('called');
        if(res.data.message === 'User registered'){
            console.log(res.data.message);
                message.value = [
                    ...message.value,
                    {
                        message: 'Registration successfull',
                        from: 'Other',
                    },
                ];
                isLogedin.value = true;
                userToken.value = res.data.userToken;
        }else{
            console.log('not registered');
        }
    }

    const CheckName = async () => {
        const res = await axios.get(`http://localhost:3000/users/usernamecheck/${input}`);
        if(res.data.message === 'Username available'){
            message.value = [
                ...message.value,
                {
                    message: input,
                    from: 'Me',
                },
            ];
            userData.value = {
                username: input,
                password: '',
            };
            setWriting('rPassword');
            message.value = [
                ...message.value,
                {
                    message: 'Enter Password',
                    from: 'Other',
                },
            ];
        }else{
            message.value = [
                ...message.value,
                {
                    message: input,
                    from: 'Me',
                },
            ];
            message.value = [
                ...message.value,
                {
                    message: 'Username already taken',
                    from: 'Other',
                },
            ];
        }
    }

    const sendMessage = async () => {
        const res = await axios.post(
            `http://localhost:3000/messages/${userToken.value.user_id}/${partnerId.value}`,
            { content: input }
        );
        console.log(res.data);
    };

    const handleInputChange = (e) => {
        setinput(e.currentTarget.value);
    };

    const handleMessageSend = () => {

        setinput('');
        document.querySelector('.message-input').focus();
        if (!isChatOpen.value) {

            if(writing === 'option'){
                if(input === 'R' || input === 'r'){
                    message.value = [
                        ...message.value,
                        {
                            message: input,
                            from: 'Me',
                        },
                    ];
                    message.value = [
                        ...message.value,
                        {
                            message: 'Enter a username',
                            from: 'Other',
                        },
                    ];
                    setWriting('rUsername');
                }else if(input ==='L' || input === 'l'){
                    message.value = [
                        ...message.value,
                        {
                            message: input,
                            from: 'Me',
                        },
                    ];
                    message.value = [
                        ...message.value,
                        {
                            message: 'Enter a username',
                            from: 'Other',
                        },
                    ];
                    setWriting('username');

                }else{
                    message.value = [
                        ...message.value,
                        {
                            message: 'Enter a valid option',
                            from: 'Other',
                        },
                    ];
                    setWriting('option');
                }
            }else if(writing === 'rUsername'){
                if (input === '') {
                    message.value = [
                        ...message.value,
                        {
                            message: 'Enter a valid username',
                            from: 'Other',
                        },
                    ];
                } else {
                     CheckName();
                }
            }else if (writing === 'username') {
                if (input === '') {
                    message.value = [
                        ...message.value,
                        {
                            message: 'Enter a valid username',
                            from: 'Other',
                        },
                    ];
                } else {
                    message.value = [
                        ...message.value,
                        {
                            message: input,
                            from: 'Me',
                        },
                    ];
                    userData.value = {
                        username: input,
                        password: '',
                    };
                    setWriting('password');
                    message.value = [
                        ...message.value,
                        {
                            message: 'Enter Password',
                            from: 'Other',
                        },
                    ];
                }
            } else if(writing === 'rPassword'){
                if(input === ''){
                    message.value = [
                        ...message.value,
                        {
                            message: 'Enter a valid password',
                            from: 'Other',
                        },
                    ];
                }else{
                    message.value = [
                        ...message.value,
                        {
                            message: input,
                            from: 'Me',
                        },
                    ];
                    userData.value = {
                        ...userData.value,
                        password: input,
                    };
                    setWriting('rConfirmPassword');
                    message.value = [
                        ...message.value,
                        {
                            message: 'Confirm Password',
                            from: 'Other',
                        },
                    ];
                }
            }else if(writing === 'rConfirmPassword'){
                if(input === userData.value.password){
                    message.value = [
                        ...message.value,
                        {
                            message: input,
                            from: 'Me',
                        },
                    ];
                    userData.value = {
                        ...userData.value,
                        password: input,
                    };
                    handleRegister();
                }else{
                    message.value = [
                        ...message.value,
                        {   
                            message: 'Passwords do not match',
                            from: 'Other',
                        },
                    ];
                    setWriting('rPassword');
                }
            }else if(writing === 'password') {
                message.value = [
                    ...message.value,
                    {
                        message: input,
                        from: 'Me',
                    },
                ];
                userData.value = {
                    ...userData.value,
                    password: input,
                };
                setWriting('username');
                CheckLogin();
            }
        } else {
            sendMessage();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            document.querySelector('.send-button').click();
        }
    };

    return (
        <>
            <div className="footer-main-container">
                <div className="input-group">
                    <input
                        type="text"
                        value={input}
                        className="form-control message-input"
                        aria-label="Text input with dropdown button"
                        onKeyDown={(e) => {
                            handleKeyPress(e);
                        }}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <button
                        className="btn btn-outline-secondary send-button"
                        type="button"
                        onClick={() => {
                            handleMessageSend();
                        }}
                    >
                        send
                    </button>
                </div>
            </div>
        </>
    );
};

export default Footer;

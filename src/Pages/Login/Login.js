import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userIdEmpty, setUserIdEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        setUserIdEmpty(userId === '');
        setPasswordEmpty(password === '');
    };
    
    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
        setUserIdEmpty(false); 
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordEmpty(false);
    };

    return (
        <div className="login">
            <form className="loginWrap">
                <div className="loginBox">
                    <h1 className='loginTitle'>Login</h1>
                    <div className='loginInput'>
                        <div className={`loginId ${userIdEmpty ? 'inputEmpty' : ''}`}>
                            <div className='textId'>아이디</div>
                            <input
                                className={`inputId ${userIdEmpty ? 'borderRed' : ''}`}
                                type='text'
                                placeholder=''
                                value={userId}
                                onChange={handleUserIdChange}
                            />
                        </div>
                        <div className={`loginPw ${passwordEmpty ? 'inputEmpty' : ''}`}>
                            <div className='textPw'>비밀번호</div>
                            <input
                                className={`inputPw ${passwordEmpty ? 'borderRed' : ''}`}
                                type='password'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>
                    <div className='loginBtnWrap'>
                        <button className="loginBtn" onClick={handleLogin}>로그인</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;

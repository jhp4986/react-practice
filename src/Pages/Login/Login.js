import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import './Login.css';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [userIdEmpty, setUserIdEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ id: '', pw: '' });

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

    const navigate = useNavigate();

    const combineLoginHandler = e => {
        onClickBtnLogin(e);
        handleLogin(e);
    }



        const handleTokenRefresh = (refreshToken) => {
            return fetch(`${BASE_URL}/users/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                refreshToken: refreshToken,
            }),
            })
            .then(response => response.json());
        };
        
        
        const onClickBtnLogin = e => {
            e.preventDefault();
        
            fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email: loginInfo.id,
                password: loginInfo.pw,
            }),
            })
            .then(response => response.json())
            .then(data => {
            if (data.accessToken) {
                // 토큰을 HTTP Only 쿠키로 설정
                document.cookie = `token=${data.accessToken}; HttpOnly; Secure; SameSite=Strict`;
                navigate('/bulletinboard');
            } else if (data.refreshToken) {
                // 리프레시 토큰을 이용한 엑세스 토큰 재발급 시도
                handleTokenRefresh(data.refreshToken)
                .then(newData => {
                    if (newData.accessToken) {
                    document.cookie = `token=${newData.accessToken}; HttpOnly; Secure; SameSite=Strict`;
                    navigate('/bullertinboard');
                    } else {
                    alert('리프레시 토큰으로 엑세스 토큰을 발급할 수 없습니다.');
                    }
                });
            } else {
                alert('입력이 틀렸습니다');
            }
            });
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
                        <button className="loginBtn" onClick={combineLoginHandler}>로그인</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;

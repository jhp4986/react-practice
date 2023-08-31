import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import "./Login.css";

const Login = () => {

    const [userIdEmpty, setUserIdEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ id: "", pw: "" });
    const navigate = useNavigate();

    const handleUserIdChange = (event) => {
        const newIdValue = event.target.value;
        setLoginInfo((prevLoginInfo) => ({
        ...prevLoginInfo,
        id: newIdValue,
        }));
        if (newIdValue.trim() === "") {
        setUserIdEmpty(true);
        } else {
        setUserIdEmpty(false);
        }
    };

    const handlePasswordChange = (event) => {
        const newPwValue = event.target.value;
        setLoginInfo((prevLoginInfo) => ({
        ...prevLoginInfo,
        pw: newPwValue,
        }));
        if (newPwValue.trim() === "") {
        setPasswordEmpty(true);
        } else {
        setPasswordEmpty(false);
        }
    };

    const handleTokenRefresh = (refreshToken) => {
        return fetch(`${BASE_URL}api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            refreshToken: refreshToken,
        }),
        }).then((response) => response.json());
    };

    const onClickBtnLogin = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: loginInfo.id,
            password: loginInfo.pw,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
            // 토큰을 HTTP Only 쿠키로 설정o
            document.cookie = `token=${data.accessToken}; HttpOnly; Secure; SameSite=Strict`;
            navigate("/bulletinboard");
            } else if (data.refreshToken) {
            // 리프레시 토큰을 이용한 엑세스 토큰 재발급 시도
            handleTokenRefresh(data.refreshToken).then((newData) => {
                if (newData.accessToken) {
                document.cookie = `token=${newData.accessToken}; HttpOnly; Secure; SameSite=Strict`;
                navigate("/bullertinboard");
                } else {
                alert("리프레시 토큰으로 엑세스 토큰을 발급할 수 없습니다.");
                }
            });
            } else {
            alert("입력이 틀렸습니다");
            }
        });
    };

    return (
        <div className="login">
        <form className="loginWrap">
            <div className="loginBox">
            <h1 className="loginTitle">Login</h1>
            <div className="loginInput">
                <div className={`loginId ${userIdEmpty ? "inputEmpty" : ""}`}>
                <div className="textId">아이디</div>
                <input className={`inputId ${userIdEmpty ? "borderRed" : ""}`} nane="id" type="text" placeholder="" value={loginInfo.id} onChange={handleUserIdChange} />
                </div>
                <div className={`loginPw ${passwordEmpty ? "inputEmpty" : ""}`}>
                <div className="textPw">비밀번호</div>
                <input className={`inputPw ${passwordEmpty ? "borderRed" : ""}`} name="pw" type="password" value={loginInfo.pw} onChange={handlePasswordChange} />
                </div>
            </div>
            <div className="loginBtnWrap">
                <button className="loginBtn" onClick={onClickBtnLogin}>
                로그인
                </button>
            </div>
            </div>
        </form>
        </div>
    );
    };

    export default Login;

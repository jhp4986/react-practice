import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import BulletinBoard from './BulletinBoard/BulletinBoard';
import Login from './Login/Login';

const  Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<BulletinBoard/>} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router

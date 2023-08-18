import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BulletinBoard from './BulletinBoard/BulletinBoard';
import Login from './Login/Login';

const  Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/bulletinboard" element={<BulletinBoard/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BulletinBoard from './Pages/BulletinBoard/BulletinBoard'; // 수정된 경로
import Login from './Pages/Login/Login'; // 수정된 경로



const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/bulletinboard" element={<BulletinBoard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;

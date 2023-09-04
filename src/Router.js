import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BulletinBoard from './Pages/BulletinBoard/BulletinBoard'; // 수정된 경로
import Login from './Pages/Login/Login'; // 수정된 경로
import NewPostForm from './Pages/BulletinBoard/NewPostForm';
import PostDetail from './Pages/BulletinBoard/PostDetail';



const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/bulletinboard" element={<BulletinBoard />} />
            <Route path="/newpost" element={<NewPostForm />} />
            <Route path="/postdetail/:postId" element={<PostDetail />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;

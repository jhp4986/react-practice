import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './PostDetail.css'

const PostDetail = () => {
const { postId } = useParams();
const [postContent, setPostContent] = useState({}); // 포스트 데이터를 저장할 상태 변수
// const [editing, setEditing]

useEffect(() => {
    async function fetchPostData() {
    try {
        const response = await fetch(`/data/data.json`); // 데이터 파일 경로
        if (!response.ok) {
        throw new Error("포스트를 불러올 수 없습니다.");
        }
        const postData = await response.json();
        const selectedPost = postData.mockData.find((post) => post.id.toString() === postId);
        if (!selectedPost) {
        throw new Error("포스트를 찾을 수 없습니다.");
        }
        setPostContent(selectedPost);
    } catch (error) {
        console.error("포스트 데이터를 가져오는 중 오류 발생:", error);
    }
    }

    fetchPostData();
}, [postId]);

return (
    <div>
        <div className="postDetailTitle">게시글 상세 정보</div>
        <div className="postDetailContent">
            <div className="postTitle">{postContent.title}</div>
            <div className="postContent">{postContent.content}</div>
            <div className="postDate">{postContent.date}</div>
        </div>
    </div>
);
};

export default PostDetail;

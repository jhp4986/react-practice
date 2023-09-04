import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
const { postId } = useParams();
const [postContent, setPostContent] = useState({}); // 포스트 데이터를 저장할 상태 변수

useEffect(() => {
    async function fetchPostData() {
    try {
        const response = await fetch(`/data/data.json`); // 데이터 파일 경로
        if (!response.ok) {
        throw new Error("포스트를 불러올 수 없습니다.");
        }
        const postData = await response.json();
        const selectedPost = postData.mockData.find((post) => post.id.toString() === postId); // postId를 사용하여 포스트 선택
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
    <h2>포스트 상세 정보</h2>
    <h3>{postContent.title}</h3>
    <p>{postContent.content}</p>
    <div>{postContent.date}</div>
    </div>
);
};

export default PostDetail;

import React, { useState } from "react";
import "./AddNewPostModal.css"

    const AddNewPostModal = ({ isModalOpen, toggleModal, handleAddPostFromModal }) => {

    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");

    const handleAddPost = () => {
        const date = new Date().toLocaleDateString();
        handleAddPostFromModal(newPostTitle, newPostContent, date);
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setNewPostTitle("");
        setNewPostContent("");
        toggleModal();
    };

return (
        <div>
        {isModalOpen && (
            <div className="modalOverlay">
            <div className="modalContent">
                <h3>New Post</h3>
                <input type="text" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} placeholder="Title" className="inputWithFocus" />
                <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Content" className="inputWithFocus" />
                <button onClick={handleAddPost}>등록</button>
                <button onClick={handleCloseModal}>취소</button>
            </div>
            </div>
        )}
        </div>
    );
};

export default AddNewPostModal;

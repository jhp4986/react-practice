    // NewPostForm.js
    import React, { useState } from "react";
    import "./NewPostForm.css";
    import { useNavigate } from "react-router-dom";
    
    
    const NewPostForm = ({ onSave }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "" || content.trim() === "") {
        alert("Please fill in both title and content fields.");
        return;
        }

        const newPost = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toLocaleDateString(),
        };

        onSave(newPost);
        setTitle("");
        setContent("");
    };

    const handleCancel = () =>{
        navigate('/bulletinboard')
    }


    return (
        <div className="newPostForm">
        <h3>Create New Post</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
            Cancel
            </button>
        </form>
        </div>
    );
    };

    export default NewPostForm;

import React from "react";
import "./DeletePost.css";

const DeletePost = ({ isOpen, onCancel, onDelete }) => {
  return (
    <div className={`modal-background ${isOpen ? "open" : ""}`}>
      <div className="delete-modal">
        <div className="modal-content">
          <h3>삭제하시겠습니까?</h3>
          <div className="modal-buttons">
            <button onClick={onDelete}>삭제</button>
            <button onClick={onCancel}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;

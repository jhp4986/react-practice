import React, { useState, useEffect } from "react";
import "./BulletinBoard.css";
import AddNewPostModal from "./AddNewPostModal";
import DeletePost from "./DeletePost";

const ITEMS_PER_PAGE = 3;

const BulletinBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [mockData, setMockData] = useState([]);
  const [selectedPostToDelete, setSelectedPostToDelete] = useState(null);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return mockData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddPostFromModal = (title, content, date) => {
    const newPost = {
      id: mockData.length + 1,
      title: title,
      content: content,
      date: date,
    };
    setMockData([...mockData, newPost]);
    setModalOpen(false);
  };

  const handleDeletePost = (postId) => {
    const updatedData = mockData.filter((post) => post.id !== postId);
    setMockData(updatedData);
    setSelectedPostToDelete(null); // 추가: 삭제 후 모달 닫기
  };

  const renderPageNumbers = () => {
    return Array.from({ length: Math.ceil(mockData.length / ITEMS_PER_PAGE) }, (_, index) => (
      <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "activePageButton" : ""} disabled={currentPage === index + 1}>
        {index + 1}
      </button>
    ));
  };

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then(({ mockData }) => {
        setMockData(mockData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openDeleteModal = (postId) => {
    setSelectedPostToDelete(postId);
  };

  const closeDeleteModal = () => {
    setSelectedPostToDelete(null);
  };

  return (
    <div>
      <div className="bulletinBoardContent">
        <h2>Bulletin Board</h2>
        <div className="bulletinTable">
          <table>
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "65%" }} />
              <col style={{ width: "11%" }} />
              <col style={{ width: "4%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>Title</th>
                <th className="contentTitle">Content</th>
                <th colSpan={2} className="dateTitle">
                  날짜
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPagePosts().map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>{post.date}</td>
                  <td>
                    <div className="deleteContent" onClick={() => openDeleteModal(post.id)}>
                      x
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button className="prevButton" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {"<"}
          </button>
          {renderPageNumbers()}
          <button className="nextButton" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(mockData.length / ITEMS_PER_PAGE)}>
            {">"}
          </button>
        </div>
        <div>
          <button className="addNewPostBtn" onClick={toggleModal}>
            글 쓰기
          </button>
        </div>
        <AddNewPostModal isModalOpen={isModalOpen} toggleModal={toggleModal} handleAddPostFromModal={handleAddPostFromModal} />
      </div>
      <DeletePost isOpen={selectedPostToDelete !== null} onCancel={closeDeleteModal} onDelete={() => handleDeletePost(selectedPostToDelete)} />
    </div>
  );
};

export default BulletinBoard;

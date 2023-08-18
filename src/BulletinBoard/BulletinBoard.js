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
	const [editingPost, setEditingPost] = useState(null);
	const [wrapContentMap, setWrapContentMap] = useState({});

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

	const handleEditPost = (post) => {
		setEditingPost(post);
	};

	const handleSaveEdit = (editedPost) => {
		const updatedData = mockData.map((post) => (post.id === editedPost.id ? editedPost : post));
		setMockData(updatedData);
		setEditingPost(null);
	};

	const handleDeletePost = (postId) => {
		setMockData((prevData) => prevData.filter((post) => post.id !== postId));
		setSelectedPostToDelete(null);
	};
	

	const renderPageNumbers = () => {
		return Array.from({ length: Math.ceil(mockData.length / ITEMS_PER_PAGE) }, (_, index) => (
		<button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "activePageButton" : ""} disabled={currentPage === index + 1}>
			{index + 1}
		</button>
		));
	};

	const handleContentCellClick = (postId) => {
		setWrapContentMap((prevWrapContentMap) => ({
		...prevWrapContentMap,
		[postId]: !prevWrapContentMap[postId],
		}));
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
				<div>
				<button className="addNewPostBtn" onClick={toggleModal}> 글 쓰기 </button>
				</div>
				<div className="bulletinTable">
				<table>
					<colgroup>
					<col style={{ width: "20%" }} />
					<col style={{ width: "60%" }} />
					<col style={{ width: "10%" }} />
					<col style={{ width: "10%" }} />
					</colgroup>
					<thead>
					<tr>
						<th>Title</th>
						<th className="contentTitle">Content</th>
						<th colSpan={2} className="dateTitle">날짜</th>
					</tr>
					</thead>
					<tbody>
					{getCurrentPagePosts().map((post) => (
						<React.Fragment key={post.id}>
						{editingPost && editingPost.id === post.id ? (
							<tr>
								<td>
									<input className="inputTitle" type="text" value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value, })}/>
								</td>
								<td>
									<textarea value={editingPost.content} onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value, })}/>
								</td>
								<td>{editingPost.date}</td>
								<td>
									<div className="reSaveContent" onClick={() => handleSaveEdit(editingPost)}>저장</div>
									<div className="reSaveCancel" onClick={() => setEditingPost(null)}>취소</div>
								</td>
							</tr>
						) : (
							<tr>
								<td>{post.title}</td>
								<td className={`contentCell ${wrapContentMap[post.id] ? "wrapText" : ""}`} onClick={() => handleContentCellClick(post.id)}>
									{post.content}
								</td>
								<td>{post.date}</td>
								<td>
									<div className="divFlex">
									<div className="modifyContent" onClick={() => handleEditPost(post)}> 수정 </div>
									<div className="deleteContent" onClick={() => openDeleteModal(post.id)}> X </div>
									</div>
								</td>
							</tr>
						)}
						</React.Fragment>
					))}
					</tbody>
				</table>
				</div>
				<div className="pageNation">
					<button className="prevButton" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
						{"<"}
					</button>
					{renderPageNumbers()}
					<button className="nextButton" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(mockData.length / ITEMS_PER_PAGE)}>
						{">"}
					</button>
				</div>
				<AddNewPostModal isModalOpen={isModalOpen} toggleModal={toggleModal} handleAddPostFromModal={handleAddPostFromModal} />
			</div>
			<DeletePost isOpen={selectedPostToDelete !== null} onCancel={closeDeleteModal} onDelete={() => handleDeletePost(selectedPostToDelete)} />
		</div>
	);
};

	export default BulletinBoard;

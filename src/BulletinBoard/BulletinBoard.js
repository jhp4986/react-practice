import React, { useState, useEffect } from "react";
import "./BulletinBoard.css";
import AddNewPostModal from "./AddNewPostModal";

	const ITEMS_PER_PAGE = 3;


	const BulletinBoard = () => {

	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setModalOpen] = useState(false);
	const [mockData, setMockData] = useState([]);

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
return (
		<div>
			<div className="bulletinBoardContent">
				<h2>Bulletin Board</h2>
				<div className="bulletinTable">
					<table>
						<colgroup>
						<col style={{ width: "20%" }} />
						<col style={{ width: "65%" }} />
						<col style={{ width: "15%" }} />
						</colgroup>
						<thead>
						<tr>
							<th>Title</th>
							<th className="contentTitle">Content</th>
							<th className="dateTitle">날짜</th>
						</tr>
						</thead>
						<tbody>
						{getCurrentPagePosts().map((post) => (
							<tr key={post.id}>
							<td>{post.title}</td>
							<td>{post.content}</td>
							<td>{post.date}</td>
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
					<button className="addNewPostBtn" onClick={toggleModal}>글 쓰기</button>
				</div>
				<AddNewPostModal isModalOpen={isModalOpen} toggleModal={toggleModal} handleAddPostFromModal={handleAddPostFromModal} />
			</div>
		</div>
	);
};

	export default BulletinBoard;

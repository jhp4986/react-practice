	import React, { useState, useEffect } from "react";
	import "./BulletinBoard.css";
	import DeletePost from "./DeletePost";
	import { useNavigate } from "react-router-dom";


	const ITEMS_PER_PAGE = 3;

	const BulletinBoard = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [mockData, setMockData] = useState([]);
	const [selectedPostToDelete, setSelectedPostToDelete] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const navigate = useNavigate();

	const addNewPost = () => {
		navigate("/newpost");
	};

	const postDetailPage = (postId) => {
		navigate(`/postdetail/${postId}`);
	};

	const getCurrentPagePosts = () => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;

		// 현재 페이지에서 필터링된 데이터를 가져옵니다.
		const currentPageData = filteredData.slice(startIndex, endIndex);

		return currentPageData.map((post) => (
		<React.Fragment key={post.id}>
			<tr>
			<td>{post.no}</td>
			<td onClick={() => postDetailPage(post.id)} className="contentCell">
				{post.title}
			</td>

			<td>{post.date}</td>
			<td>
				<div className="divFlex">
				<div className="deleteContent" onClick={() => openDeleteModal(post.id)}>
					{" "}
					X{" "}
				</div>
				</div>
			</td>
			</tr>
		</React.Fragment>
		));
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleDeletePost = (postId) => {
		setFilteredData((prevData) => prevData.filter((post) => post.id !== postId));
		setSelectedPostToDelete(null);
	};

	const renderPageNumbers = () => {
		return Array.from({ length: Math.ceil(filteredData.length / ITEMS_PER_PAGE) }, (_, index) => (
		<button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "activePageButton" : ""} disabled={currentPage === index + 1}>
			{index + 1}
		</button>
		));
	};

	const handleSearch = () => {
		// 검색어를 이용하여 mockData를 필터링합니다.
		const filteredPosts = mockData.filter((post) => post.no.includes(searchTerm) || post.title.includes(searchTerm) || post.date.includes(searchTerm));

		// 필터링된 결과를 상태에 저장하고 검색 중인 상태로 설정합니다.
		setFilteredData(filteredPosts);
		setIsSearching(true);
	};

	const handleResetSearch = () => {
		// 검색 결과를 초기화하고 검색 중인 상태를 해제합니다.
		setSearchTerm("");
		setFilteredData([]);
		setIsSearching(false);

		// 화면을 새로고침합니다.
		window.location.reload();
	};

	useEffect(() => {
		fetch("/data/data.json")
		.then((res) => res.json())
		.then(({ mockData }) => {
			setMockData(mockData);
			setFilteredData(mockData); // 초기에 필터링된 데이터를 모든 데이터로 설정합니다.
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
			<div className="searchiingForm">
			<input
				className="searchingInput"
				type="text"
				placeholder="검색어 입력"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={(e) => {
				if (e.key === "Enter") {
					handleSearch();
				}
				}}
			/>
			<button className="searchingBtn" onClick={handleSearch}>
				검색
			</button>
			{isSearching && ( // 검색 중인 경우에만 "원래대로 돌아오기" 버튼 표시
				<button className="searchingResetBtn" onClick={handleResetSearch}>
				reset
				</button>
			)}
			</div>

			<div>
			<button onClick={addNewPost} className="addNewPostBtn">
				글 쓰기
			</button>
			</div>
			<div className="bulletinTable">
			<table>
				<colgroup>
				<col style={{ width: "20%" }} />
				<col style={{ width: "60%" }} />
				<col style={{ width: "12%" }} />
				<col style={{ width: "8%" }} />
				</colgroup>
				<thead>
				<tr>
					<th>No.</th>
					<th className="contentTitle">Title</th>
					<th colSpan={2} className="dateTitle">
					날짜
					</th>
				</tr>
				</thead>
				<tbody>{getCurrentPagePosts()}</tbody>
			</table>
			</div>

			<div className="pageNation">
			<button className="prevButton" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
				{"<"}
			</button>
			{renderPageNumbers()}
			<button className="nextButton" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(filteredData.length / ITEMS_PER_PAGE)}>
				{">"}
			</button>
			</div>
		</div>
		<DeletePost isOpen={selectedPostToDelete !== null} onCancel={closeDeleteModal} onDelete={() => handleDeletePost(selectedPostToDelete)} />
		</div>
	);
	};

	export default BulletinBoard;

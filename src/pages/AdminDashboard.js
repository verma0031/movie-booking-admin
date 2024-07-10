import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AddCategory from "../components/AddCategory";
import AddMovie from "../components/AddMovie";
import ShowtimeManagement from "../components/ShowtimeManagement";
import BookedMovies from "../components/BookedMovies";

const AdminDashboard = () => {
	return (
		<div>
			<Header />
			<Sidebar />
			<main>
				<Routes>
					<Route path="add-category" element={<AddCategory />} />
					<Route path="add-movie" element={<AddMovie />} />
					<Route path="showtime-management" element={<ShowtimeManagement />} />
					<Route path="booked-movies" element={<BookedMovies />} />
				</Routes>
			</main>
		</div>
	);
};

export default AdminDashboard;

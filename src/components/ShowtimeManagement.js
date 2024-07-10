import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, push, set, get } from "firebase/database";

const ShowtimeManagement = () => {
	const [showtimeData, setShowtimeData] = useState({
		movieId: "",
		date: "",
		time: "",
	});

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		// Fetch movies from RTDB
		const moviesRef = ref(db, "movies");
		get(moviesRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					const moviesData = [];
					snapshot.forEach((childSnapshot) => {
						moviesData.push({
							id: childSnapshot.key,
							name: childSnapshot.val().name,
						});
					});
					setMovies(moviesData);
				} else {
					console.log("No movies available");
				}
			})
			.catch((error) => {
				console.error("Error fetching movies:", error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setShowtimeData({ ...showtimeData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const showtimesRef = ref(db, `movies/${showtimeData.movieId}/showtimes`);
			const newShowtimeRef = push(showtimesRef);
			await set(newShowtimeRef, {
				date: showtimeData.date,
				time: showtimeData.time,
			});

			console.log("Showtime added successfully!");
			setShowtimeData({
				movieId: "",
				date: "",
				time: "",
			});
		} catch (error) {
			console.error("Error adding showtime: ", error);
		}
	};

	return (
		<div>
			<h2>Showtime Management</h2>
			<form onSubmit={handleSubmit}>
				<select
					name="movieId"
					value={showtimeData.movieId}
					onChange={handleInputChange}
				>
					<option value="">Select Movie</option>
					{movies.map((movie) => (
						<option key={movie.id} value={movie.id}>
							{movie.name}
						</option>
					))}
				</select>
				<input
					type="date"
					name="date"
					value={showtimeData.date}
					onChange={handleInputChange}
					placeholder="Date"
				/>
				<input
					type="time"
					name="time"
					value={showtimeData.time}
					onChange={handleInputChange}
					placeholder="Time"
				/>
				<button type="submit">Add Showtime</button>
			</form>
		</div>
	);
};

export default ShowtimeManagement;

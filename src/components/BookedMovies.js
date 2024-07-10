import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";

const BookedMovies = () => {
	const [bookedMovies, setBookedMovies] = useState([]);

	useEffect(() => {
		// Function to fetch booked movies from RTDB
		const fetchBookedMovies = () => {
			const bookedMoviesRef = ref(db, "bookedMovies");

			// Listen for changes in bookedMoviesRef
			onValue(bookedMoviesRef, (snapshot) => {
				const bookedMoviesData = snapshot.val();
				if (bookedMoviesData) {
					const bookedMoviesArray = Object.values(bookedMoviesData);
					setBookedMovies(bookedMoviesArray);
				} else {
					setBookedMovies([]);
				}
			});
		};

		// Call fetchBookedMovies on component mount
		fetchBookedMovies();

		// Clean up listener on component unmount
		return () => {
			// Detach the onValue listener
		};
	}, []); // Empty dependency array ensures this effect runs only once

	return (
		<div>
			<h2>Booked Movies</h2>
			<ul>
				{bookedMovies.map((movie, index) => (
					<li key={index}>
						<strong>Movie Name:</strong> {movie.movieName} |{" "}
						<strong>Showtime:</strong> {movie.showtime} | <strong>Date:</strong>{" "}
						{movie.date}
					</li>
				))}
			</ul>
		</div>
	);
};

export default BookedMovies;

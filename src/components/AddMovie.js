import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, push, set, get } from "firebase/database";

const AddMovie = () => {
	const [movieData, setMovieData] = useState({
		name: "",
		description: "",
		director: "",
		genre: "",
		releaseDate: "",
		language: "",
		imdbRating: "",
		category: "", // Updated to include category
	});

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		// Fetch categories from RTDB
		const categoriesRef = ref(db, "categories");
		get(categoriesRef)
			.then((snapshot) => {
				if (snapshot.exists()) {
					const categoriesData = [];
					snapshot.forEach((childSnapshot) => {
						categoriesData.push({
							id: childSnapshot.key,
							name: childSnapshot.val().name,
						});
					});
					setCategories(categoriesData);
				} else {
					console.log("No categories available");
				}
			})
			.catch((error) => {
				console.error("Error fetching categories:", error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setMovieData({ ...movieData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const moviesRef = ref(db, "movies");
			const newMovieRef = push(moviesRef);
			await set(newMovieRef, {
				...movieData,
				category: movieData.category, // Assign category ID
			});

			console.log("Movie added successfully!");
			setMovieData({
				name: "",
				description: "",
				director: "",
				genre: "",
				releaseDate: "",
				language: "",
				imdbRating: "",
				category: "",
			});
		} catch (error) {
			console.error("Error adding movie: ", error);
		}
	};

	return (
		<div>
			<h2>Add Movie</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					value={movieData.name}
					onChange={handleInputChange}
					placeholder="Movie Name"
				/>
				<input
					type="text"
					name="description"
					value={movieData.description}
					onChange={handleInputChange}
					placeholder="Description"
				/>
				<input
					type="text"
					name="director"
					value={movieData.director}
					onChange={handleInputChange}
					placeholder="Director"
				/>
				<input
					type="text"
					name="genre"
					value={movieData.genre}
					onChange={handleInputChange}
					placeholder="Genre"
				/>
				<input
					type="date"
					name="releaseDate"
					value={movieData.releaseDate}
					onChange={handleInputChange}
					placeholder="Release Date"
				/>
				<input
					type="text"
					name="language"
					value={movieData.language}
					onChange={handleInputChange}
					placeholder="Language"
				/>
				<input
					type="number"
					name="imdbRating"
					value={movieData.imdbRating}
					onChange={handleInputChange}
					placeholder="IMDB Rating"
				/>
				<select
					name="category"
					value={movieData.category}
					onChange={handleInputChange}
				>
					<option value="">Select Category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<button type="submit">Add Movie</button>
			</form>
		</div>
	);
};

export default AddMovie;

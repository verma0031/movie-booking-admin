import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";

const AddCategory = () => {
	const [categoryName, setCategoryName] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const categoriesRef = ref(db, "categories");
			const newCategoryRef = push(categoriesRef);
			await set(newCategoryRef, {
				name: categoryName,
			});
			console.log("Category added successfully!");
			setCategoryName("");
		} catch (error) {
			console.error("Error adding category: ", error);
		}
	};

	return (
		<div>
			<h2>Add Category</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
					placeholder="Category Name"
				/>
				<button type="submit">Add Category</button>
			</form>
		</div>
	);
};

export default AddCategory;

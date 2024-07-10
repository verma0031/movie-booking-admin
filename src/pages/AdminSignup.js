// src/pages/AdminSignup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const AdminSignup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			navigate("/admin/login");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			<h2>Admin Signup</h2>
			<form onSubmit={handleSignup}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && <p>{error}</p>}
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default AdminSignup;

// src/App.js
import React from "react";
import ReactDOM from "react-dom/client";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/admin/login" />} />
				<Route path="/admin/login" element={<AdminLogin />} />
				<Route path="/admin/signup" element={<AdminSignup />} />
				<Route
					path="/admin/dashboard/*"
					element={
						<ProtectedRoute>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

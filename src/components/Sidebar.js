import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<aside>
			<nav>
				<ul>
					<li>
						<NavLink to="/admin/dashboard/add-category">Add Category</NavLink>
					</li>
					<li>
						<NavLink to="/admin/dashboard/add-movie">Add Movie</NavLink>
					</li>
					<li>
						<NavLink to="/admin/dashboard/showtime-management">
							Showtime Management
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/dashboard/booked-movies">Booked Movies</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;

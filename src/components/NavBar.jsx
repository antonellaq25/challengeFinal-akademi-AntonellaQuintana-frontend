import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/types/authTypes";

const NavbarPanel = ({ role }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: LOGOUT });
		navigate("/");
	};

	const navConfig = {
		superadmin: [
			{ label: "Dashboard", to: "/admin" },
			{ label: "New user", to: "/admin/new-user" },
			{ label: "Courses", to: "/courses" },
			{ label: "Users", to: "/users" },
			{ label: "Stats", to: "/stats" },
		],
		teacher: [
			{ label: "Courses", to: "/teacher/courses" },
			{ label: "Grades", to: "/teacher/grades" },
		],
		student: [
			{ label: "Courses", to: "/courses" },
			{ label: "My courses", to: "/my-courses" },
			{ label: "My grades", to: "/my-grades" },
		],
	};

	const roleInfo = {
		superadmin: { title: "Admin Panel", color: "bg-red-500", icon: "👨‍💼" },
		teacher: { title: "Teacher Panel", color: "bg-blue-500", icon: "👩‍🏫" },
		student: { title: "Student Panel", color: "bg-green-500", icon: "👩‍🎓" },
	};

	const navItems = navConfig[role] || [];
	const currentRole = roleInfo[role] || roleInfo.student;

	return (
		<Navbar className="sticky top-0 z-10 shadow-md border-0 rounded-none bg-white/95 backdrop-blur-sm max-w-full">
			<div className="flex items-center justify-between px-6 py-2 w-full">
				<div className="flex items-center gap-3">
					<div className={`w-8 h-8 ${currentRole.color} rounded-lg flex items-center justify-center text-white text-sm`}>
						{currentRole.icon}
					</div>
					<Typography variant="h6" className="text-gray-800 font-semibold">
						{currentRole.title}
					</Typography>
				</div>
				<div className="hidden lg:flex items-center gap-1">
					{navItems.map(({ label, to }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
									isActive
										? "bg-blue-50 text-blue-600"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								}`
							}
						>
							{label}
						</NavLink>
					))}
					<Button
						onClick={handleLogout}
						variant="outlined"
						size="sm"
						className="ml-4 border-red-300 text-red-600 hover:bg-red-50 rounded-lg"
					>
						Logout
					</Button>
				</div>

			</div>
		</Navbar>
	);
};

export default NavbarPanel;
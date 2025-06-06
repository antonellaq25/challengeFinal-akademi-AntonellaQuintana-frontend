import React from "react";
import { Link } from "react-router-dom";
import NavbarPanel from "../components/NavBar";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const AdminDashboardPage = () => {
	const role = useSelector((state) => state.auth.user?.role);

	const adminActions = [
		{
			title: "User Management",
			description: "Add, edit, and manage user accounts",
			link: "/users",
			color: "blue",
			icon: "👥"
		},
		{
			title: "Course Management",
			description: "Create and organize courses",
			link: "/courses",
			color: "green",
			icon: "📚"
		},
		{
			title: "Statistics",
			description: "View platform analytics and reports",
			link: "/stats",
			color: "orange",
			icon: "📈"
		}
	];

	return (
		<>
			<NavbarPanel role={role} />
			<div className="min-h-screen bg-gray-50">
				<div className="container mx-auto px-4 py-8">
					<div className="text-center mb-8">
						<Typography variant="h3" className="text-gray-800 mb-2">
							Administration Panel
						</Typography>
						<Typography className="text-gray-600">
							Manage your platform efficiently from one central location
						</Typography>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						{adminActions.map((action, index) => (
							<Card key={index} className="hover:shadow-lg transition-shadow duration-300">
								<CardBody className="text-center p-6">
									<div className="text-4xl mb-4">{action.icon}</div>
									<Typography variant="h6" className="text-gray-800 mb-2">
										{action.title}
									</Typography>
									<Typography className="text-sm text-gray-600 mb-4">
										{action.description}
									</Typography>
									<Link to={action.link}>
										<Button
											color={action.color}
											size="sm"
											fullWidth
											className="rounded-lg"
										>
											Access
										</Button>
									</Link>
								</CardBody>
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminDashboardPage;
import React from "react";
import NavbarPanel from "../components/NavBar";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const AdminDashboardPage = () => {
	const role = useSelector((state) => state.auth.user?.role);
	return (
		<>
			<NavbarPanel role={role} />
			<div className="flex justify-center items-center min-h-screen bg-red-50 px-4 pt-16">
				<Card className="w-full max-w-3xl">
					<CardBody>
						<Typography variant="h4" color="blue-gray" className="mb-4 text-center">
							Administration Panel
						</Typography>
						<Typography variant="paragraph" className="text-center mb-6">
							Manage users, courses and grades.
						</Typography>
					</CardBody>
				</Card>
			</div>
		</>
	);
};

export default AdminDashboardPage;

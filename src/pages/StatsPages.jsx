import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../store/actions/statsActions";
import NavbarPanel from "../components/NavBar";
import {
	Card,
	CardBody,
	Typography,
	Spinner,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const StatsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { loading, error, stats } = useSelector((state) => state.stats);

	useEffect(() => {
		if (!user || user.role !== "superadmin") {
			navigate("/unauthorized");
		} else {
			dispatch(getStats());
		}
	}, [dispatch, user, navigate]);

	if (loading) {
		return (
			<div className="min-h-screen bg-red-50 flex items-center justify-center">
				<Spinner className="h-8 w-8" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-red-50 p-6">
				<NavbarPanel role={user?.role} />
				<div className="flex justify-center pt-20">
					<Card className="w-full max-w-md">
						<CardBody className="text-center">
							<Typography color="red" variant="h6">
								{error}
							</Typography>
						</CardBody>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-red-50">
			<NavbarPanel role={user?.role} />
			
			<div className="container mx-auto px-4 py-8">
				<Typography variant="h3" className="text-center mb-8 text-gray-800">
					User Statistics
				</Typography>

				<div className="grid gap-6 max-w-4xl mx-auto">
					<Card>
						<CardBody className="text-center">
							<Typography variant="h2" color="blue" className="mb-2">
								{stats?.total || 0}
							</Typography>
							<Typography variant="h6" color="gray">
								Total Users
							</Typography>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Typography variant="h5" className="mb-4 text-gray-800">
								Users by Role
							</Typography>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
											<th className="text-right py-3 px-4 font-semibold text-gray-700">Count</th>
										</tr>
									</thead>
									<tbody>
										{stats?.roles?.map((stat, index) => (
											<tr key={stat._id} className="border-b border-gray-100 last:border-0">
												<td className="py-3 px-4 capitalize">{stat._id}</td>
												<td className="py-3 px-4 text-right font-medium">{stat.count}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Typography variant="h5" className="mb-4 text-gray-800">
								Monthly Registrations
							</Typography>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-gray-200">
											<th className="text-left py-3 px-4 font-semibold text-gray-700">Month</th>
											<th className="text-right py-3 px-4 font-semibold text-gray-700">Count</th>
										</tr>
									</thead>
									<tbody>
										{stats?.monthly?.map((stat, index) => (
											<tr key={index} className="border-b border-gray-100 last:border-0">
												<td className="py-3 px-4">Month {stat._id}</td>
												<td className="py-3 px-4 text-right font-medium">{stat.count}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default StatsPage;
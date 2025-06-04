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
	useEffect(() => {
  console.log("Stats recibidas2:", stats);
}, [stats]);

	return (
		<div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
			<NavbarPanel role={user?.role} />
			<div className="flex w-full justify-center items-start min-h-screen bg-red-50 px-4 pt-10">
				<Card className="w-full max-w-5xl">
					<CardBody>
						<Typography variant="h4" className="mb-4">
							User Statistics
						</Typography>
						{loading ? (
							<Spinner className="mx-auto" />
						) : error ? (
							<Typography color="red">{error}</Typography>
						) : (
							<div className="space-y-8">
								<div>
									<Typography variant="h6">Total Users: {stats?.total}</Typography>
								</div>
								<div>
									<Typography variant="h6" className="mb-2">Users by Role</Typography>
									<table className="w-full min-w-max table-auto text-left">
										<thead>
											<tr>
												<th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal leading-none opacity-70"
													>
														Role
													</Typography>
												</th>
												<th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal leading-none opacity-70"
													>
														Count
													</Typography>
												</th>
											</tr>
										</thead>
										<tbody>
											{stats?.roles?.map((stat, index) => {
												const isLast = index === stats.roles.length - 1;
												const classes = isLast
													? "p-4"
													: "p-4 border-b border-blue-gray-50";

												return (
													<tr key={stat._id}>
														<td className={classes}>{stat._id}</td>
														<td className={classes}>{stat.count}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
								<div>
									<Typography variant="h6" className="mb-2">Users Registered per Month</Typography>
									<table className="w-full min-w-max table-auto text-left">
										<thead>
											<tr>
												<th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal leading-none opacity-70"
													>
														Month
													</Typography>
												</th>
												<th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal leading-none opacity-70"
													>
														Count
													</Typography>
												</th>
											</tr>
										</thead>
										<tbody>
											{stats?.monthly?.map((stat, index) => {
												const isLast = index === stats.monthly.length - 1;
												const classes = isLast
													? "p-4"
													: "p-4 border-b border-blue-gray-50";

												return (
													<tr key={index}>
														<td className={classes}>Month {stat._id}</td>
														<td className={classes}>{stat.count}</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						)}
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default StatsPage;

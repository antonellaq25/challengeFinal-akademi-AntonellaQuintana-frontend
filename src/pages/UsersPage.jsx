import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavBar";
import {
	Card, CardBody, Typography, Button,
	Spinner, Input, Select, Option
} from "@material-tailwind/react";

const tableHeaders = ["Name", "Email", "Role", "Actions"];
const roleOptions = ["superadmin", "teacher", "student"];

const UsersPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const { users, loading, error, totalPages } = useSelector((state) => state.users);
	const isSuperadmin = user?.role === "superadmin";

	const [currentPage, setCurrentPage] = useState(1);
	const limit = 5;

	const [filters, setFilters] = useState({ name: "", email: "", role: "" });
	const [tempFilters, setTempFilters] = useState(filters);

	useEffect(() => {
		if (isSuperadmin) dispatch(getUsers(currentPage, limit, filters));
	}, [dispatch, isSuperadmin, currentPage, filters]);

	const handleEdit = (id) => navigate(`/admin/users/edit/${id}`);
	const handleDelete = (id) => {
		if (confirm("Are you sure you want to delete this user?")) {
			dispatch(deleteUser(id)).then(() =>
				dispatch(getUsers(currentPage, limit, filters))
			);
		}
	};

	const handleFilterChange = (key, value) =>
		setTempFilters((prev) => ({ ...prev, [key]: value }));

	const applyFilters = () => {
		setCurrentPage(1);
		setFilters(tempFilters);
	};

	if (!isSuperadmin) {
		return (
			<div className="flex flex-col min-h-screen bg-red-50">
				<NavbarPanel role={user?.role} />
				<div className="flex justify-center items-center flex-grow">
					<Typography variant="h5" color="red">
						Access denied: Only superadmin can view this page.
					</Typography>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-red-50">
			<NavbarPanel role={user?.role} />
			<div className="flex justify-center px-4 pt-10">
				<Card className="w-full max-w-6xl">
					<CardBody>
						<Typography variant="h4" className="mb-6 text-center text-blue-900">
							User Management
						</Typography>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
							<Input
								label="Name"
								value={tempFilters.name}
								onChange={(e) => handleFilterChange("name", e.target.value)}
							/>
							<Input
								label="Email"
								value={tempFilters.email}
								onChange={(e) => handleFilterChange("email", e.target.value)}
							/>
							<Select
								label="Role"
								value={tempFilters.role}
								onChange={(value) => handleFilterChange("role", value)}
							>
								<Option value="">All</Option>
								{roleOptions.map((r) => (
									<Option key={r} value={r}>
										{r.charAt(0).toUpperCase() + r.slice(1)}
									</Option>
								))}
							</Select>
							<Button color="blue" onClick={applyFilters} className="self-end">
								Search
							</Button>
						</div>
						{loading ? (
							<div className="flex justify-center">
								<Spinner />
							</div>
						) : error ? (
							<Typography color="red">{error}</Typography>
						) : (
							<>
								<div className="overflow-x-auto">
									<table className="min-w-full text-left border-collapse">
										<thead>
											<tr className="bg-blue-50">
												{tableHeaders.map((h) => (
													<th key={h} className="py-2 px-4 border-b">{h}</th>
												))}
											</tr>
										</thead>
										<tbody>
											{users?.map(({ _id, name, email, role }) => (
												<tr key={_id} className="hover:bg-blue-50">
													<td className="py-2 px-4 border-b">{name}</td>
													<td className="py-2 px-4 border-b">{email}</td>
													<td className="py-2 px-4 border-b capitalize">{role}</td>
													<td className="py-2 px-4 border-b space-x-2">
														<Button size="sm" color="blue" onClick={() => handleEdit(_id)}>
															Edit
														</Button>
														<Button size="sm" color="red" onClick={() => handleDelete(_id)}>
															Delete
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								<div className="flex justify-center mt-6 gap-4">
									<Button
										variant="outlined"
										disabled={currentPage === 1}
										onClick={() => setCurrentPage((p) => p - 1)}
									>
										Previous
									</Button>
									<Typography className="self-center">
										Page {currentPage} of {totalPages}
									</Typography>
									<Button
										variant="outlined"
										disabled={currentPage === totalPages}
										onClick={() => setCurrentPage((p) => p + 1)}
									>
										Next
									</Button>
								</div>
							</>
						)}
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default UsersPage;
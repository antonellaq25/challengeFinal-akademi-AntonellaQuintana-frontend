import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../../store/actions/userActions";
import { getUserById } from "../../store/actions/userActions"; 
import NavbarPanel from "../components/NavBar";
import {
	Button,
	Card,
	CardBody,
	Input,
	Select,
	Option,
	Typography,
	Spinner,
} from "@material-tailwind/react";

const UserEditForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { userDetail, loading, error } = useSelector((state) => state.users);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "student",
	});

	useEffect(() => {
		dispatch(getUserById(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (userDetail) {
			setFormData({
				name: userDetail.name || "",
				email: userDetail.email || "",
				role: userDetail.role || "student",
			});
		}
	}, [userDetail]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSelectChange = (value) => {
		setFormData({ ...formData, role: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUser(id, formData));
		navigate("/users");
	};

	return (
		<div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
			<NavbarPanel role={user?.role} />
		<div className="p-6 flex w-full justify-center bg-red-50 min-h-screen">
			<Card className="w-full max-w-xl mt-10">
				<CardBody>
					<Typography variant="h4" className="mb-6">
						Edit User
					</Typography>

					{loading ? (
						<Spinner className="mx-auto" />
					) : error ? (
						<Typography color="red">{error}</Typography>
					) : (
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<Input
									label="Name"
									name="name"
									value={formData.name}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Input
									label="Email"
									name="email"
									value={formData.email}
									onChange={handleChange}
								/>
							</div>
							<div>
								<Select label="Role" value={formData.role} onChange={handleSelectChange}>
									<Option value="student">Student</Option>
									<Option value="teacher">Teacher</Option>
									<Option value="superadmin">Superadmin</Option>
								</Select>
							</div>
							<div className="flex justify-end">
								<Button type="submit" color="blue">
									Update
								</Button>
							</div>
						</form>
					)}
				</CardBody>
			</Card>
		</div>
		</div>
	);
};
export default UserEditForm;

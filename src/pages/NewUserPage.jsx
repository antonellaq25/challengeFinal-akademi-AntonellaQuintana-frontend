import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavBar";
import {
	Card,
	CardBody,
	Input,
	Button,
	Typography,
	Select,
	Option,
} from "@material-tailwind/react";
import { createUser } from "../../store/actions/userActions";

const NewUserPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const { loading, error } = useSelector((state) => state.users || {});

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "teacher",
	});

	const handleChange = ({ target: { name, value } }) =>
		setFormData((prev) => ({ ...prev, [name]: value }));

	const handleRoleChange = (value) =>
		setFormData((prev) => ({ ...prev, role: value }));

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createUser(formData));
		navigate("/admin");
	};

	const fields = [
		{ name: "name", label: "Name", type: "text" },
		{ name: "email", label: "Email", type: "email" },
		{ name: "password", label: "Password", type: "password", minLength: 6 },
	];

	return (
		<div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
			<NavbarPanel role={user?.role} />
			<div className="flex w-full justify-center items-center min-h-screen bg-red-50 px-4">
				<Card className="w-full max-w-md">
					<CardBody>
						<Typography variant="h4" className="text-center mb-6">
							Add new user
						</Typography>

						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							{fields.map(({ name, label, type, minLength }) => (
								<Input
									key={name}
									name={name}
									label={label}
									type={type}
									value={formData[name]}
									onChange={handleChange}
									required
									minLength={minLength}
								/>
							))}

							<Select label="Rol" value={formData.role} onChange={handleRoleChange} required>
								<Option value="teacher">Teacher</Option>
								<Option value="superadmin">Superadmin</Option>
							</Select>

							<Button type="submit" disabled={loading}>
								{loading ? "Creating..." : "New user"}
							</Button>

							{error && (
								<Typography color="red" className="text-center">
									{error}
								</Typography>
							)}
						</form>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default NewUserPage;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../store/actions/courseActions";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavBar";
import {
	Card,
	CardBody,
	Typography,
	Input,
	Button,
	Textarea,
} from "@material-tailwind/react";

const CreateCoursePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);
	const { loading, error } = useSelector((state) => state.course);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [maxStudents, setMaxStudents] = useState("");
	const [active, setActive] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();

		const maxStudentsNum = Number(maxStudents);
		if (
			!Number.isInteger(maxStudentsNum) ||
			maxStudentsNum <= 0
		) {
			alert("Max students must be a positive integer");
			return;
		}

		const newCourse = {
			title,
			description,
			category,
			price: Number(price),
			maxStudents: maxStudentsNum,
			active,
		};

		dispatch(createCourse(newCourse)).then(() => {
			navigate("/teacher/courses");
		});
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
			<NavbarPanel role={user?.role} />
			<div className="flex w-full justify-center items-start min-h-screen bg-gray-50 px-4 pt-10">
				<Card className="w-full max-w-lg">
					<CardBody>
						<Typography variant="h4" color="blue-gray" className="mb-6 text-center">
							Add new course
						</Typography>

						{error && <Typography color="red">{error}</Typography>}

						<form onSubmit={handleSubmit} className="space-y-4">
							<Input
								label="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
							<Textarea
								label="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
							<Input
								label="Category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								required
							/>
							<Input
								label="Price"
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								required
							/>
							<Input
								label="Max Students"
								type="number"
								value={maxStudents}
								onChange={(e) => {
									const val = e.target.value;

									if (val === "" || /^[0-9\b]+$/.test(val)) {
										setMaxStudents(val);
									}
								}}
								required
								min={1}
							/>

							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									checked={active}
									onChange={() => setActive(!active)}
									id="active-checkbox"
								/>
								<label htmlFor="active-checkbox">Active</label>
							</div>

							<Button type="submit" color="green" disabled={loading}>
								{loading ? "Creating..." : "Add course"}
							</Button>
						</form>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default CreateCoursePage;

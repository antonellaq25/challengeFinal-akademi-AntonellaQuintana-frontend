import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetail, updateCourse } from "../../store/actions/courseActions";
import NavbarPanel from "../components/NavBar";
import {
	Card, CardBody, Typography, Input, Button, Textarea, Spinner
} from "@material-tailwind/react";

const initialFormState = {
	title: "",
	description: "",
	category: "",
	price: "",
	active: true,
};

const EditCoursePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useSelector(state => state.auth);
	const { loading, error, course } = useSelector((state) => state.courseDetail);

	const [form, setForm] = useState(initialFormState);

	useEffect(() => {
		dispatch(getCourseDetail(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (course) {
			setForm({
				title: course.title || "",
				description: course.description || "",
				category: course.category || "",
				price: course.price || "",
				active: course.active ?? true,
			});
		}
	}, [course]);

	const handleChange = ({ target: { name, value, type, checked } }) => {
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateCourse(id, { ...form, price: Number(form.price) }))
			.then(() => navigate("/teacher/courses"));
	};

	if (loading || !course) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spinner />
			</div>
		);
	}

	const formFields = [
		{ label: "Title", name: "title" },
		{ label: "Description", name: "description", isTextarea: true },
		{ label: "Category", name: "category" },
		{ label: "Price", name: "price", type: "number" },
	];

	return (
		<div className="min-h-screen bg-blue-gray-50 p-6 flex flex-col items-center">
			<NavbarPanel role={user?.role} />
			<div className="flex w-full justify-center items-start min-h-screen bg-gray-5 0 px-4 pt-10">
				<Card className="w-full max-w-lg">
					<CardBody>
						<Typography variant="h4" color="blue-gray" className="mb-6 text-center">
							Edit Course
						</Typography>

						{error && <Typography color="red">{error}</Typography>}

						<form onSubmit={handleSubmit} className="space-y-4">
							{formFields.map(({ label, name, type = "text", isTextarea }) =>
								isTextarea ? (
									<Textarea
										key={name}
										label={label}
										name={name}
										value={form[name]}
										onChange={handleChange}
										required
									/>
								) : (
									<Input
										key={name}
										label={label}
										name={name}
										type={type}
										value={form[name]}
										onChange={handleChange}
										required
									/>
								)
							)}

							<div className="flex items-center space-x-2">
								<input
									type="checkbox"
									name="active"
									checked={form.active}
									onChange={handleChange}
									id="active-checkbox"
								/>
								<label htmlFor="active-checkbox">Active</label>
							</div>

							<Button type="submit" color="amber" disabled={loading}>
								{loading ? "Updating..." : "Update Course"}
							</Button>
						</form>
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default EditCoursePage;

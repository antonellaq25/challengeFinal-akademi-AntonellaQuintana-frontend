import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses, deleteCourse } from "../../store/actions/courseActions";
import {
	Card,
	CardBody,
	Typography,
	Spinner,
	Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/NavBar";

const CoursesPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, courses } = useSelector((state) => state.course);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user?.role === "teacher") {
			dispatch(getMyCourses());
		} else {

		}
	}, [dispatch, user]);

	const handleCreate = () => {
		navigate("/courses/create");
	};

	const handleEdit = (id) => {
		navigate(`/courses/${id}/edit`);
	};

	const handleDelete = (id) => {
		const confirmDelete = window.confirm("¿Estás seguro que quieres borrar este curso?");
		if (confirmDelete) {
			dispatch(deleteCourse(id));
		}
	};

	return (
		<>
			<AppNavbar />
			<div className="flex flex-col items-center min-h-screen bg-green-50 px-4 pt-10">
				{user?.role === "teacher" && (
					<div className="w-full max-w-4xl mb-6 flex justify-end">
						<Button color="green" onClick={handleCreate}>
							Crear Nuevo Curso
						</Button>
					</div>
				)}

				<Card className="w-full max-w-4xl">
					<CardBody>
						<Typography variant="h4" color="blue-gray" className="mb-4 text-center">
							Mis Cursos
						</Typography>

						{loading && <Spinner className="mx-auto" />}

						{error && (
							<Typography color="red" className="text-center">
								{error}
							</Typography>
						)}

						{!loading && !error && (
							<ul className="space-y-4">
								{courses?.length > 0 ? (
									courses.map((course) => (
										<li
											key={course._id}
											className="border p-4 rounded bg-white flex flex-col md:flex-row md:items-center md:justify-between"
										>
											<div>
												<Typography variant="h6">{course.title}</Typography>
												<Typography variant="small" color="gray">
													{course.description}
												</Typography>
											</div>

											<div className="mt-4 md:mt-0 space-x-2 flex">
												<Button
													size="sm"
													color="amber"
													onClick={() => handleEdit(course._id)}
												>
													Editar
												</Button>

												<Button
													size="sm"
													color="red"
													onClick={() => handleDelete(course._id)}
												>
													Borrar
												</Button>
											</div>
										</li>
									))
								) : (
									<Typography className="text-center text-gray-500">
										No tienes cursos creados aún.
									</Typography>
								)}
							</ul>
						)}
					</CardBody>
				</Card>
			</div>
		</>
	);
};

export default CoursesPage;

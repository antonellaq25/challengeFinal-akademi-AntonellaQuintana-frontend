import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarPanel from "../components/NavBar";
import { getGradesByStudent } from "../../store/actions/gradeActions";
import {
	Card,
	CardBody,
	Typography,
	Spinner,
	Alert,
} from "@material-tailwind/react";

const MyGradesPage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { grades: gradesResponse, loading, error } = useSelector(
		(state) => state.grade
	);
	const grades = gradesResponse?.results || [];

	useEffect(() => {
		dispatch(getGradesByStudent());
	}, [dispatch]);
	console.log("grade", grades)
	return (
		<div className="min-h-screen bg-red-50 flex flex-col items-center">
			<NavbarPanel role={user?.role} />

			<div className="p-6 max-w-5xl mx-auto w-full">
				<Typography variant="h3" color="blue-gray" className="mb-6 text-center">
					My Grades
				</Typography>

				{loading && (
					<div className="flex justify-center my-10">
						<Spinner className="h-12 w-12" color="blue" />
					</div>
				)}

				{error && (
					<Alert color="red" className="mb-4">
						{error}
					</Alert>
				)}

				{!loading && grades.length === 0 && (
					<Typography color="gray" className="text-center mt-4">
						No grades found.
					</Typography>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					{grades.map((gr) =>
						gr.courseId ? (
							<Card key={gr._id} shadow className="border">
								<CardBody>
									<Typography variant="h5" className="mb-2">
										{gr.courseId.title}
									</Typography>
									<Typography color="gray" className="mb-1">
										Category: {gr.courseId.category}
									</Typography>
									<Typography color="blue-gray" className="mt-2 font-semibold">
										Grade: {gr.score ?? "Not graded yet"}
									</Typography>
								</CardBody>
							</Card>
						) : (
							<Card
								key={gr._id}
								className="bg-red-50 border border-red-300"
							>
								<CardBody>
									<Typography color="red" className="mb-2 font-semibold">
										Grade not available (course may be deleted)
									</Typography>
								</CardBody>
							</Card>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default MyGradesPage;

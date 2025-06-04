import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarPanel from "../components/NavBar";
import {
	listStudentEnrollments,
	deleteEnrollment,
} from "../../store/actions/enrollmentActions";
import {
	Card,
	CardBody,
	Typography,
	Button,
	Spinner,
	Alert,
} from "@material-tailwind/react";

const MyEnrollmentsPage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { enrollments, loading, error } = useSelector(
		(state) => state.enrollmentList
	);

	useEffect(() => {
		dispatch(listStudentEnrollments());
	}, [dispatch]);

	const handleUnenroll = (id) => {
		if (window.confirm("Are you sure you want to unenroll?")) {
			dispatch(deleteEnrollment(id));
		}
	};

	return (
		<div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
			<NavbarPanel role={user?.role} />
			<div className="p-6 max-w-5xl mx-auto">
				<Typography variant="h3" color="blue-gray" className="mb-6">
					My Enrolled Courses
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

				<div className="grid grid-cols-1 justify-between md:grid-cols-2 gap-6">
					{enrollments.map((enroll) =>
						enroll.course ? (
							<Card key={enroll._id} shadow={true} className="border">
								<CardBody>
									<Typography variant="h5" className="mb-2">
										{enroll.course.title}
									</Typography>
									<Typography color="gray" className="mb-1">
										Category: {enroll.course.category}
									</Typography>
									<Typography color="gray" className="mb-4">
										Price: ${enroll.course.price}
									</Typography>
									<Button
										color="red"
										size="sm"
										onClick={() => handleUnenroll(enroll._id)}
									>
										Cancel Enrollment
									</Button>
								</CardBody>
							</Card>
						) : (
							<Card key={enroll._id} className="bg-red-50 border border-red-300">
								<CardBody>
									<Typography color="red" className="mb-2 font-semibold">
										Course not available (possibly deleted)
									</Typography>
									<Button
										color="red"
										size="sm"
										variant="outlined"
										onClick={() => handleUnenroll(enroll._id)}
									>
										Remove Enrollment
									</Button>
								</CardBody>
							</Card>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default MyEnrollmentsPage;

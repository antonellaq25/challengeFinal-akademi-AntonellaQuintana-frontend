import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetail } from "../../store/actions/courseActions";
import { getEnrollmentsByCourse } from "../../store/actions/enrollmentActions";
import NavbarPanel from "../components/NavBar";
import {
	Card,
	CardBody,
	Typography,
	Spinner,
	Chip,
} from "@material-tailwind/react";

const CourseDetailPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const { loading, error, course } = useSelector((state) => state.courseDetail);
	const { user } = useSelector((state) => state.auth);
	const {
		enrollments: data,
		loading: loadingEnrollments,
	} = useSelector((state) => state.enrollmentList);

	const enrollments = data?.enrollments || [];
	const isAdmin = user?.role === "superadmin";
	const isOwnerTeacher = user?.role === "teacher" && user._id === course?.teacher;

	useEffect(() => {
		if (id) {
			dispatch(getCourseDetail(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (course && (isAdmin || isOwnerTeacher)) {
			dispatch(getEnrollmentsByCourse(course._id));
		}
	}, [dispatch, course, isAdmin, isOwnerTeacher]);

	return (
		<>
			<NavbarPanel role={user?.role} />
			<div className="min-h-screen bg-gray-50 py-8 px-4">
				<div className="max-w-4xl mx-auto space-y-6">

					{loading && (
						<div className="flex justify-center items-center py-20">
							<Spinner className="h-8 w-8" />
						</div>
					)}

					{error && (
						<Card className="max-w-md mx-auto">
							<CardBody className="text-center">
								<Typography color="red" variant="h6">
									{error}
								</Typography>
							</CardBody>
						</Card>
					)}

					{course && !loading && !error && (
						<>
							{/* Course Info Card */}
							<Card>
								<CardBody>
									<Typography variant="h3" color="blue-gray" className="mb-4">
										{course?.title}
									</Typography>

									<Typography variant="lead" className="mb-6 text-gray-700">
										{course?.description}
									</Typography>

									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<Typography variant="small" color="gray" className="font-medium">
												Category
											</Typography>
											<Chip value={course?.category} size="sm" className="mt-1" />
										</div>

										<div>
											<Typography variant="small" color="gray" className="font-medium">
												Price
											</Typography>
											<Typography variant="h6" color="green" className="mt-1">
												${course?.price}
											</Typography>
										</div>

										<div>
											<Typography variant="small" color="gray" className="font-medium">
												Max Students
											</Typography>
											<Typography variant="h6" className="mt-1">
												{course?.maxStudents}
											</Typography>
										</div>
									</div>
								</CardBody>
							</Card>

							{/* Enrollments Card - Only for admin/teacher */}
							{(isAdmin || isOwnerTeacher) && (
								<Card>
									<CardBody>
										<div className="flex items-center justify-between mb-4">
											<Typography variant="h5" color="blue-gray">
												Enrolled Students
											</Typography>
											<Chip
												value={loadingEnrollments ? "Loading..." : enrollments.length}
												size="sm"
												color="blue"
											/>
										</div>

										{loadingEnrollments ? (
											<div className="flex justify-center py-8">
												<Spinner className="h-6 w-6" />
											</div>
										) : enrollments.length > 0 ? (
											<div className="overflow-x-auto">
												<table className="w-full min-w-max table-auto text-left">
													<thead>
														<tr>
															{["Name", "Email", "Status"].map((head) => (
																<th key={head} className="border-b border-gray-200 bg-gray-50 p-4">
																	<Typography
																		variant="small"
																		color="blue-gray"
																		className="font-semibold leading-none"
																	>
																		{head}
																	</Typography>
																</th>
															))}
														</tr>
													</thead>
													<tbody>
														{enrollments.map((enr, index) => {
															const isLast = index === enrollments.length - 1;
															const classes = isLast ? "p-4" : "p-4 border-b border-gray-100";

															return (
																<tr key={enr._id} className="hover:bg-gray-50">
																	<td className={classes}>
																		<Typography variant="small" className="font-medium">
																			{enr.student?.name || "N/A"}
																		</Typography>
																	</td>
																	<td className={classes}>
																		<Typography variant="small" color="gray">
																			{enr.student?.email || "N/A"}
																		</Typography>
																	</td>
																	<td className={classes}>
																		<Chip
																			value={enr.status || "Enrolled"}
																			size="sm"
																			color={enr.status === "Enrolled" ? "green" : "gray"}
																		/>
																	</td>
																</tr>
															);
														})}
													</tbody>
												</table>
											</div>
										) : (
											<div className="text-center py-8">
												<Typography color="gray">
													No students enrolled yet
												</Typography>
											</div>
										)}
									</CardBody>
								</Card>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default CourseDetailPage;
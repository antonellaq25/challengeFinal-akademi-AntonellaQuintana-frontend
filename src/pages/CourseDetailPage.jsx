import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetail } from "../../store/actions/courseActions";
import { getEnrollmentsByCourse } from "../../store/actions/enrollmentActions";
import {
	Card,
	CardBody,
	Typography,
	Spinner,
	Chip,
	Button,
} from "@material-tailwind/react";
import NavbarPanel from "../components/NavBar";

const CourseDetailPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState(1);
	const limit = 5;

	const { user } = useSelector((state) => state.auth);
	const { loading, error, course } = useSelector((state) => state.courseDetail);
	const {
		enrollments: data,
		loading: loadingEnrollments,
	} = useSelector((state) => state.enrollmentList);

	const enrollments = data?.enrollments || [];
	const totalPages = data?.totalPages || 1;
	const total = data?.total || 0;

	const isAdmin = user?.role === "superadmin";
	const isOwnerTeacher = user?.role === "teacher" && user._id === course?.teacher;

	useEffect(() => {
		if (id) dispatch(getCourseDetail(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (course && (isAdmin || isOwnerTeacher)) {
			dispatch(getEnrollmentsByCourse(course._id, currentPage, limit));
		}
	}, [dispatch, course, isAdmin, isOwnerTeacher, currentPage]);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<>
			<NavbarPanel role={user?.role} />
			<div className="min-h-screen bg-gray-50 py-8 px-4">
				<div className="max-w-4xl mx-auto space-y-6">

					{loading ? (
						<div className="flex justify-center py-20">
							<Spinner className="h-8 w-8" />
						</div>
					) : error ? (
						<Card className="max-w-md mx-auto">
							<CardBody className="text-center">
								<Typography color="red" variant="h6">{error}</Typography>
							</CardBody>
						</Card>
					) : (
						course && (
							<>
								<Card>
									<CardBody>
										<Typography variant="h3" color="blue-gray" className="mb-4">
											{course.title}
										</Typography>
										<Typography variant="lead" className="mb-6 text-gray-700">
											{course.description}
										</Typography>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div>
												<Typography variant="small" color="gray">Category</Typography>
												<Chip value={course.category} size="sm" className="mt-1" />
											</div>
											<div>
												<Typography variant="small" color="gray">Price</Typography>
												<Typography variant="h6" color="green">${course.price}</Typography>
											</div>
											<div>
												<Typography variant="small" color="gray">Max Students</Typography>
												<Typography variant="h6">{course.maxStudents}</Typography>
											</div>
										</div>
									</CardBody>
								</Card>
								{(isAdmin || isOwnerTeacher) && (
									<Card>
										<CardBody>
											<div className="flex justify-between items-center mb-4">
												<Typography variant="h5">Enrolled Students</Typography>
												<Chip value={`Total: ${total}`} size="sm" color="blue" />
											</div>

											{loadingEnrollments ? (
												<div className="flex justify-center py-6">
													<Spinner className="h-6 w-6" />
												</div>
											) : enrollments.length > 0 ? (
												<>
													<table className="w-full min-w-max text-left">
														<thead>
															<tr>
																<th className="p-3 border-b">Name</th>
																<th className="p-3 border-b">Email</th>
																<th className="p-3 border-b">Status</th>
															</tr>
														</thead>
														<tbody>
															{enrollments.map((enr) => (
																<tr key={enr._id} className="hover:bg-gray-50">
																	<td className="p-3">{enr.student?.name || "N/A"}</td>
																	<td className="p-3 text-gray-600">{enr.student?.email || "N/A"}</td>
																	<td className="p-3">
																		<Chip
																			value={enr.status || "Enrolled"}
																			size="sm"
																			color={enr.status === "Enrolled" ? "green" : "gray"}
																		/>
																	</td>
																</tr>
															))}
														</tbody>
													</table>
													<div className="flex justify-between items-center mt-6">
														<div className="flex gap-2">
															<Button
																size="sm"
																variant="outlined"
																onClick={() => handlePageChange(currentPage - 1)}
																disabled={currentPage === 1}
															>
																Previous
															</Button>
															{[...Array(totalPages).keys()].map((i) => {
																const page = i + 1;
																return (
																	<Button
																		key={page}
																		size="sm"
																		onClick={() => handlePageChange(page)}
																		variant={page === currentPage ? "filled" : "outlined"}
																		color={page === currentPage ? "blue" : "gray"}
																		className="min-w-[36px]"
																	>
																		{page}
																	</Button>
																);
															})}
															<Button
																size="sm"
																variant="outlined"
																onClick={() => handlePageChange(currentPage + 1)}
																disabled={currentPage === totalPages}
															>
																Next
															</Button>
														</div>
													</div>
												</>
											) : (
												<Typography color="gray" className="text-center py-6">
													No students enrolled yet.
												</Typography>
											)}
										</CardBody>
									</Card>
								)}
							</>
						)
					)}
				</div>
			</div>
		</>
	);
};
export default CourseDetailPage;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "../../store/actions/courseActions";
import { createGrade, updateGrade, getGradesByCourse } from "../../store/actions/gradeActions";
import { getEnrollmentsByCourse } from "../../store/actions/enrollmentActions";
import NavbarPanel from "../components/NavBar";
import {
	Card, CardBody, Typography, Select, Option,
	Input, Button, Spinner, Alert
} from "@material-tailwind/react";

const TeacherGradesPage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { courses } = useSelector(state => state.course);
	const { enrollments: enrollmentData, loading: enrollmentsLoading } = useSelector(state => state.enrollmentList);
	const { grades, loading: gradesLoading } = useSelector(state => state.grade);

	const enrollments = enrollmentData?.enrollments || [];

	const [selectedCourse, setSelectedCourse] = useState("");
	const [newGrades, setNewGrades] = useState({});
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		dispatch(getMyCourses());
	}, [dispatch]);

	useEffect(() => {
		if (selectedCourse) {
			dispatch(getEnrollmentsByCourse(selectedCourse));
			dispatch(getGradesByCourse(selectedCourse));
		}
	}, [selectedCourse, dispatch]);

	const handleGradeChange = (studentId, value) => {
		setNewGrades(prev => ({ ...prev, [studentId]: value }));
	};

	const handleSubmit = async (studentId) => {
		const score = parseFloat(newGrades[studentId]);
		if (isNaN(score) || score < 1 || score > 10) {
			alert("Grade must be a number between 1 and 10");
			return;
		}

		const existingGrade = grades.find(g =>
			(g.studentId._id || g.studentId) === studentId
		);

		try {
			if (existingGrade) {
				await dispatch(updateGrade(existingGrade._id, score));

				setSuccessMessage("Grade updated successfully!");
			} else {
				await dispatch(createGrade({ studentId, courseId: selectedCourse, score }));
				setSuccessMessage("Grade saved successfully!");
			}

			setNewGrades(prev => {
				const copy = { ...prev };
				delete copy[studentId];
				return copy;
			});

			dispatch(getGradesByCourse(selectedCourse));

			setTimeout(() => setSuccessMessage(""), 3000);
		} catch (error) {
			alert("Error saving/updating grade.");
		}
	};

	const getStudentGrade = (studentId) => {
		const gradeObj = grades.find(g =>
			(g.studentId._id || g.studentId) === studentId
		);
		return gradeObj?.score ?? "N/A";
	};

	const isLoading = enrollmentsLoading || gradesLoading;

	const gradedStudentIds = grades.map(g =>
		typeof g.studentId === "object" ? g.studentId._id : g.studentId
	);

	const studentsWithoutGrade = enrollments.filter(
		(enr) => !gradedStudentIds.includes(enr.student._id)
	);

	const studentsWithGrade = enrollments.filter(
		(enr) => gradedStudentIds.includes(enr.student._id)
	);

	return (
		<div className="min-h-screen bg-blue-gray-50 flex flex-col items-center">
			<NavbarPanel role={user?.role} />

			<Card className="w-full max-w-4xl">
				<CardBody>
					<Typography variant="h4" className="mb-6 text-center">Manage Grades</Typography>

					<div className="mb-6">
						<Typography variant="h6" className="mb-2">Select a course:</Typography>
						<Select label="Choose a course" value={selectedCourse} onChange={setSelectedCourse}>
							{courses.map(course => (
								<Option key={course._id} value={course._id}>{course.title}</Option>
							))}
						</Select>
					</div>

					{successMessage && (
						<Alert color="green" className="mb-4 text-center">{successMessage}</Alert>
					)}

					{isLoading && (
						<div className="flex justify-center my-8"><Spinner /></div>
					)}

					{!isLoading && selectedCourse && enrollments.length === 0 && (
						<Typography color="gray" className="text-center mt-4">
							No students enrolled in this course.
						</Typography>
					)}

					{!isLoading && studentsWithoutGrade.map(({ _id, student }) => (
						<Card key={_id} className="mb-4 shadow-sm">
							<CardBody>
								<Typography variant="h6">Student: {student?.name}</Typography>
								<div className="flex items-center gap-4">
									<Input
										label="New grade"
										type="number"
										required
										min={1}
										value={newGrades[student._id] || ""}
										onChange={(e) => handleGradeChange(student._id, e.target.value)}
									/>
									<Button color="blue" onClick={() => handleSubmit(student._id)}>
										Save
									</Button>
								</div>
							</CardBody>
						</Card>
					))}

					{!isLoading && studentsWithGrade.length > 0 && (
						<div className="mt-8">
							<Typography variant="h5" className="mb-4 text-center">Graded Students</Typography>
							{studentsWithGrade.map(({ _id, student }) => (
								<Card key={_id} className="mb-4 bg-green-50 shadow-sm">
									<CardBody>
										{student ? (
											<>
												<Typography variant="h6">Student: {student.name}</Typography>
												<Typography color="green" className="font-semibold mb-2">
													Current Grade: {getStudentGrade(student._id)}
												</Typography>
												<div className="flex items-center gap-4">
													<Input
														label="Update grade"
														type="number"
														required
														min={1}
														value={newGrades[student._id] || ""}
														onChange={(e) => handleGradeChange(student._id, e.target.value)}
													/>
													<Button color="green" onClick={() => handleSubmit(student._id)}>
														Update
													</Button>
												</div>
											</>
										) : (
											<>
												<Typography variant="h6" color="red">Student: Deleted</Typography>
												<Typography color="red" className="font-semibold">
													Final Grade: Not available
												</Typography>
											</>
										)}
									</CardBody>
								</Card>
							))}
						</div>
					)}
				</CardBody>
			</Card>
		</div>
	);
};
export default TeacherGradesPage;
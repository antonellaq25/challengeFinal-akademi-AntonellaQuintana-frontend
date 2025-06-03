import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "../../store/actions/courseActions";
import { createGrade, getGradesByCourse } from "../../store/actions/gradeActions";
import { getEnrollmentsByCourse } from "../../store/actions/enrollmentActions";
import NavbarPanel from "../components/NavBar";
import {
	Card, CardBody, Typography, Select, Option,
	Input, Button, Spinner, Alert,
} from "@material-tailwind/react";

const TeacherGradesPage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { courses } = useSelector((state) => state.course);
	const { enrollments: enrollmentData, loading: enrollmentsLoading } = useSelector((state) => state.enrollmentList);
	const { grades, loading: gradesLoading } = useSelector((state) => state.grade);
	const enrollments = enrollmentData?.enrollments || [];

	const [selectedCourse, setSelectedCourse] = useState("");
	const [newGrades, setNewGrades] = useState({});
	const [gradedStudents, setGradedStudents] = useState([]);
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

	useEffect(() => {
		if (grades.length > 0) {
			setGradedStudents(
				grades.map((g) =>
					typeof g.studentId === "object" ? g.studentId._id.toString() : g.studentId.toString()
				)
			);
		} else {
			setGradedStudents([]);
		}
	}, [grades]);

	const handleGradeChange = (studentId, value) => {
		setNewGrades((prev) => ({ ...prev, [studentId]: value }));
	};

	const handleSubmit = async (studentId) => {
		const value = parseFloat(newGrades[studentId]);
		if (isNaN(value) || value < 1 || value > 10) {
			alert("Grade must be a number between 1 and 10");
			return;
		}

		const gradeData = {
			studentId,
			courseId: selectedCourse,
			score: value,
		};

		try {
			await dispatch(createGrade(gradeData));
			setGradedStudents((prev) => [...prev, studentId]);
			setSuccessMessage("Grade saved successfully!");
			setNewGrades((prev) => {
				const copy = { ...prev };
				delete copy[studentId];
				return copy;
			});
			setTimeout(() => setSuccessMessage(""), 3000);
		} catch {
			alert("Error saving grade.");
		}
	};

	const getStudentGrade = (studentId) => {
		const gradeObj = grades.find((g) =>
			typeof g.studentId === "object"
				? g.studentId._id === studentId
				: g.studentId === studentId
		);
		return gradeObj ? gradeObj.score : "N/A";
	};
	console.log("graded students", gradedStudents)
	console.log("grades", grades)
	console.log("enrollments", enrollments)
	return (
		<div className="min-h-screen bg-blue-gray-50 p-6 flex flex-col items-center">
			<NavbarPanel role={user?.role} />
			<Card className="w-full max-w-4xl">
				<CardBody>
					<Typography variant="h4" className="mb-6 text-center">Manage Grades</Typography>

					<div className="mb-6">
						<Typography variant="h6" className="mb-2">Select a course:</Typography>
						<Select label="Choose a course" value={selectedCourse} onChange={(val) => setSelectedCourse(val)}>
							{courses.map((course) => (
								<Option key={course._id} value={course._id}>{course.title}</Option>
							))}
						</Select>
					</div>

					{successMessage && (
						<Alert color="green" className="mb-4 text-center">{successMessage}</Alert>
					)}

					{(enrollmentsLoading || gradesLoading) && (
						<div className="flex justify-center my-8"><Spinner /></div>
					)}

					{!enrollmentsLoading && !gradesLoading && selectedCourse && enrollments.length === 0 && (
						<Typography color="gray" className="text-center mt-4">
							No students enrolled in this course.
						</Typography>
					)}
					{!enrollmentsLoading && !gradesLoading && enrollments
						.filter((enr) => !gradedStudents.includes(enr.student._id))
						.map((enr) => (
							<Card key={enr._id} className="mb-4 shadow-sm">
								<CardBody>
									<Typography variant="h6">Student: {enr.student?.name}</Typography>
									<div className="flex items-center gap-4">
										<Input
											label="New grade"
											type="number"
											min={1}
											max={10}
											step={0.1}
											value={newGrades[enr.student._id] || ""}
											onChange={(e) => handleGradeChange(enr.student._id, e.target.value)}
										/>

										<Button color="blue" onClick={() => handleSubmit(enr.student._id)}>
											Save
										</Button>
									</div>
								</CardBody>
							</Card>
						))}
					{!enrollmentsLoading && !gradesLoading && enrollments
						.filter((enr) => gradedStudents.includes(enr.student._id))
						.length > 0 && (
							<div className="mt-8">
								<Typography variant="h5" className="mb-4 text-center">Already Graded Students</Typography>
								{enrollments
									.filter((enr) => gradedStudents.includes(enr.student._id))
									.map((enr) => (
										<Card key={enr._id} className="mb-4 bg-green-50 shadow-sm">
											<CardBody>
												<Typography variant="h6">Student: {enr.student?.name}</Typography>
												<Typography color="green" className="font-semibold">
													Final Grade: {getStudentGrade(enr.student._id)}
												</Typography>
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
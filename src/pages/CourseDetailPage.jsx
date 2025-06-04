import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetail } from "../../store/actions/courseActions";
import { getEnrollmentsByCourse } from "../../store/actions/enrollmentActions";
import { Card, CardBody, Typography, Spinner } from "@material-tailwind/react";

const CourseDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, course } = useSelector((state) => state.courseDetail);
  const { user } = useSelector((state) => state.auth);
  const { enrollments: data, loading: loadingEnrollments } = useSelector((state) => state.enrollmentList);

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
  <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 pt-10">
    <Card className="w-full max-w-3xl">
      <CardBody>
        {loading && <Spinner className="mx-auto" />}
        {error && <Typography color="red">{error}</Typography>}

        {course && (
          <>
            <Typography variant="h4" className="mb-2">{course.title}</Typography>
            <Typography>{course.description}</Typography>
            <Typography>Category: {course.category}</Typography>
            <Typography>Price: ${course.price}</Typography>
            <Typography>Max. Students: {course.maxStudents}</Typography>

            {(isAdmin || isOwnerTeacher) && (
              <>
                <Typography className="mt-4 font-medium text-blue-800">
                  Enrolled students:{" "}
                  {loadingEnrollments ? "Cargando..." : enrollments.length}
                </Typography>

                {enrollments.length > 0 && (
                  <div className="mt-4">
                    <Typography className="font-semibold">List of students:</Typography>
                    <ul className="list-disc list-inside">
                      {enrollments.map((enr) => (
                        <li key={enr._id}>
                          {enr.student?.name} ({enr.student?.email})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </CardBody>
    </Card>
  </div>
);

};

export default CourseDetailPage;

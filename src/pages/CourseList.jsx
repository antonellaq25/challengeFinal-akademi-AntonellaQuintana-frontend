import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../store/actions/courseActions";
import { createEnrollment, listStudentEnrollments } from "../../store/actions/enrollmentActions";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavBar";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Spinner,
  Alert,
  Input,
} from "@material-tailwind/react";

const CourseList = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, courses, totalPages } = useSelector((state) => state.course);
  const { enrollments } = useSelector((state) => state.enrollmentList);
  const { loading: enrolling, error: enrollError, success } = useSelector(
    (state) => state.enrollmentCreate || {}
  );

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const [filters, setFilters] = useState({ category: "", title: "" });
  const [tempFilters, setTempFilters] = useState(filters);

  const [showSuccess, setShowSuccess] = useState(false);
  const [alertOn, setAlertOn] = useState(false);

  const roleOptions = ["teacher", "student"];

  useEffect(() => {
    dispatch(getCourses(currentPage, limit, filters));
    if (user?.role === "student") {
      dispatch(listStudentEnrollments());
    }
  }, [dispatch, user, currentPage, filters]);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      dispatch(listStudentEnrollments());
    }
  }, [success, dispatch]);

  const handleDetail = (id) => navigate(`/courses/${id}`);
  const handleEnroll = (courseId) => {
    dispatch(createEnrollment(courseId));
    setAlertOn(true);
  };

  const isEnrolled = (courseId) =>
    enrollments?.some((e) => e.course?._id === courseId);

  const handleFilterChange = (key, value) =>
    setTempFilters((prev) => ({ ...prev, [key]: value }));

  const applyFilters = () => {
    setCurrentPage(1);
    setFilters(tempFilters);
  };

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center">
      <NavbarPanel role={user?.role} />
      <Typography variant="h4" className="mb-6">
        All Courses Available
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 px-4 w-full max-w-6xl">
        <Input
          label="Category"
          value={tempFilters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        />
        <Input
          label="Title"
          value={tempFilters.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
        />
        <Button color="blue" onClick={applyFilters} className="self-end">
          Search
        </Button>
      </div>
      {loading && (
        <div className="flex justify-center my-10">
          <Spinner color="blue" />
        </div>
      )}
      {error && <Alert color="red" className="mb-4">{error}</Alert>}
      {enrollError && <Alert color="red" className="mb-4">{enrollError}</Alert>}
      {showSuccess && (
        <Alert color="green" className="mb-4">
          You have successfully enrolled in the course!
        </Alert>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {courses && courses.length > 0 ? (
          courses.map(({ _id, title, category, description }) => (
            <Card key={_id} className="shadow-lg">
              <CardBody>
                <Typography variant="h5" className="mb-2">{title}</Typography>
                <Typography variant="small" className="text-gray-500 mb-4">
                  Category: {category}
                </Typography>
                <Typography className="mb-4">{description}</Typography>
                <div className="flex gap-2">
                  <Button onClick={() => handleDetail(_id)} size="sm" color="blue">
                    See more
                  </Button>
                  {user?.role === "student" && (
                    <Button
                      size="sm"
                      color={isEnrolled(_id) ? "gray" : "green"}
                      onClick={() => handleEnroll(_id)}
                      disabled={isEnrolled(_id) || enrolling}
                    >
                      {isEnrolled(_id) ? "Enrolled" : enrolling ? "Enrolling..." : "Enroll"}
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          !loading && (
            <div className="col-span-full text-center py-8">
              <Typography variant="h6" color="gray">
                {error ? "Error loading courses" : "No courses available"}
              </Typography>
            </div>
          )
        )}
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Typography className="self-center">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {alertOn && (
        <Alert color="green" className="mb-4" onClose={() => setAlertOn(false)}>
          You have successfully enrolled in the course!
        </Alert>
      )}
    </div>
  );
};
export default CourseList;
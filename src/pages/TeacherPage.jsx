import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Button,
} from "@material-tailwind/react";
import NavbarPanel from "../components/NavBar";
import { getMyCourses, deleteCourse } from "../../store/actions/courseActions";

const TeacherPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { loading, error, courses = [] } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);

  const handleDetail = (id) => navigate(`/courses/${id}`);
  const handleCreate = () => navigate("/courses/create");
  const handleEdit = (id) => navigate(`/courses/${id}/edit`);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <NavbarPanel role={user?.role} />

      <div className="max-w-5xl mx-auto mt-8">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="text-blue-gray-800 font-bold">
            My Courses
          </Typography>
          {user?.role === "teacher" && (
            <Button color="green" onClick={handleCreate}>
              Create Course
            </Button>
          )}
        </div>

        <Card className="shadow-lg rounded-2xl">
          <CardBody className="p-6">
            {loading && <Spinner className="mx-auto" color="blue" />}

            {error && (
              <Typography color="red" className="text-center">
                {error}
              </Typography>
            )}

            {!loading && !error && (
              <>
                {courses.length ? (
                  <ul className="grid md:grid-cols-2 gap-6">
                    {courses.map(({ _id, title, description }) => (
                      <li key={_id}>
                        <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all h-full">
                          <CardBody className="flex flex-col gap-4 h-full">
                            <Typography variant="h6" color="blue-gray">
                              {title}
                            </Typography>
                            <Typography color="gray" className="text-sm flex-grow">
                              {description}
                            </Typography>
                            <div className="flex justify-end gap-2 mt-auto">
                              <Button size="sm" color="blue" onClick={() => handleDetail(_id)}>
                                See More
                              </Button>
                              <Button size="sm" color="amber" onClick={() => handleEdit(_id)}>
                                Edit
                              </Button>
                              <Button size="sm" color="red" onClick={() => handleDelete(_id)}>
                                Delete
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography className="text-center text-gray-600">
                    You haven't created any courses yet.
                  </Typography>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPage;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses, deleteCourse } from "../../store/actions/courseActions";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Button,
} from "@material-tailwind/react";
import NavbarPanel from "../components/NavBar";

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
    <>
      <NavbarPanel role={user?.role} />

      <section className="min-h-screen bg-gray-100 px-4 py-10 flex flex-col items-center">
        {user?.role === "teacher" && (
          <div className="w-full max-w-5xl mb-6 flex justify-end">
            <Button color="green" onClick={handleCreate}>
              Create Course
            </Button>
          </div>
        )}

        <Card className="w-full max-w-5xl shadow-lg rounded-2xl">
          <CardBody className="p-8">
            <Typography variant="h3" color="blue-gray" className="text-center mb-8">
              My Courses
            </Typography>

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
                        <Card className="bg-white shadow-md hover:shadow-lg transition-all rounded-xl flex flex-col h-full">
                          <CardBody className="flex flex-col gap-4 flex-grow">
                            <Typography variant="h5" color="blue-gray">
                              {title}
                            </Typography>
                            <Typography color="gray" className="text-sm flex-grow">
                              {description}
                            </Typography>
                            <div className="mt-auto flex justify-end gap-2">
                              <Button size="sm" color="blue" onClick={() => handleDetail(_id)}>
                                See more
                              </Button>
                              {user?.role === "teacher" && (
                                <>
                                  <Button size="sm" color="amber" onClick={() => handleEdit(_id)}>
                                    Edit
                                  </Button>
                                  <Button size="sm" color="red" onClick={() => handleDelete(_id)}>
                                    Delete
                                  </Button>
                                </>
                              )}
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
      </section>
    </>
  );
};

export default TeacherPage;

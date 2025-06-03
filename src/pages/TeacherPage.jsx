import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "../../store/actions/courseActions";
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

  return (
    <>
      <NavbarPanel role={user?.role} />

      <section className="min-h-screen bg-green-50 px-4 py-10 flex justify-center">
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
                        <Card className="bg-white shadow-md hover:shadow-lg transition-all rounded-xl">
                          <CardBody className="flex flex-col gap-4">
                            <Typography variant="h5" color="blue-gray">
                              {title}
                            </Typography>
                            <Typography color="gray" className="text-sm">
                              {description}
                            </Typography>
                            <div className="mt-auto text-right">
                              <Button
                                size="sm"
                                color="blue"
                                onClick={() => handleDetail(_id)}
                              >
                                See more
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
      </section>
    </>
  );
};

export default TeacherPage;

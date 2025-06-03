import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "../../store/actions/courseActions";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../components/NavBar";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);

  const handleDetail = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <>
      <AppNavbar />
      <div className="flex justify-center items-start min-h-screen bg-green-50 px-4 pt-10">
        <Card className="w-full max-w-4xl">
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
              Mis Cursos
            </Typography>
            {loading && <Spinner className="mx-auto" />}
            {error && (
              <Typography color="red" className="text-center">
                {error}
              </Typography>
            )}
            {!loading && !error && (
              <ul className="space-y-4">
                {courses?.length > 0 ? (
                  courses.map((course) => (
                    <li key={course._id} className="border p-4 rounded bg-white">
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="small" color="gray">
                        {course.description}
                      </Typography>
                      <Button
                        onClick={() => handleDetail(course._id)}
                        size="sm"
                        color="blue"
                        className="mt-2"
                      >
                        Ver Detalle
                      </Button>
                    </li>
                  ))
                ) : (
                  <Typography className="text-center text-gray-500">
                    No tienes cursos creados aún.
                  </Typography>
                )}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default CoursesPage;

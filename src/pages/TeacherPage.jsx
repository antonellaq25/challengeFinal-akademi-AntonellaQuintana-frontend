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
import NavbarPanel from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const TeacherPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const role = useSelector((state) => state.auth.user?.role);
  const { loading, error, courses = [] } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);

  const handleDetail = (id) => navigate(`/courses/${id}`);

  const renderCourses = () =>
    courses.length > 0 ? (
      courses.map(({ _id, title, description }) => (
        <li
          key={_id}
          className="border p-4 rounded bg-white flex justify-between items-center"
        >
          <div>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="small" color="gray">
              {description}
            </Typography>
          </div>
          <Button size="sm" color="blue" onClick={() => handleDetail(_id)}>
            See more
          </Button>
        </li>
      ))
    ) : (
      <Typography className="text-center text-gray-500">
        You haven't created any course yet.
      </Typography>
    );

  return (
    <>
     <NavbarPanel role={role} />
      <div className="flex justify-center items-start min-h-screen bg-green-50 px-4 pt-10">
        <Card className="w-full max-w-4xl">
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
              My courses
            </Typography>

            {loading && <Spinner className="mx-auto" />}

            {error && (
              <Typography color="red" className="text-center">
                {error}
              </Typography>
            )}

            {!loading && !error && <ul className="space-y-4">{renderCourses()}</ul>}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TeacherPage;

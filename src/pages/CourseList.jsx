import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../store/actions/courseActions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavBar";

import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const CourseList = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, courses } = useSelector((state) => state.course);
 ;

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleDetail = (id) => navigate(`/courses/${id}`);

  return (
    <div className="min-h-screen bg-red-50 p-6 flex flex-col items-center">
      <NavbarPanel role={user?.role} />
      
        <Typography variant="h4" className="mb-6">
          All Courses Available
        </Typography>

        {loading && <Typography>Loading courses...</Typography>}
        {error && (
          <Typography color="red" className="mb-4">
            {error}
          </Typography>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(({ _id, title, category, description }) => (
            <Card key={_id} className="shadow-lg">
              <CardBody>
                <Typography variant="h5" className="mb-2">
                  {title}
                </Typography>
                <Typography variant="small" className="text-gray-500 mb-4">
                  Category: {category}
                </Typography>
                <Typography className="mb-4">{description}</Typography>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDetail(_id)}
                    size="sm"
                    color="blue"
                    className="mt-2"
                  >
                    See more
                  </Button>
                  {user?.role === "student" && (
                    <Button
                      size="sm"
                      color="green"
                      onClick={() => alert("Simulated enrollment")}
                    >
                      Sign Up
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div> 
    </div>
  );
};

export default CourseList;

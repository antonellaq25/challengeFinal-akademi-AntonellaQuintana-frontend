import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Spinner,
  Button,
  Chip,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavbarPanel role={user?.role} />
        <div className="flex items-center justify-center pt-20">
          <Spinner className="h-8 w-8" color="blue" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarPanel role={user?.role} />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Typography variant="h3" className="text-gray-800 mb-2">
              My Courses
            </Typography>
            <div className="flex items-center gap-3">
              <Chip
                value={`${courses.length} Course${courses.length !== 1 ? 's' : ''}`}
                className="bg-blue-100 text-blue-800"
              />
              <Typography className="text-gray-600">
                Manage and organize your teaching content
              </Typography>
            </div>
          </div>
          
          {user?.role === "teacher" && (
            <Button 
              color="blue" 
              onClick={handleCreate}
              className="flex items-center gap-2 px-6 py-3 rounded-xl shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Course
            </Button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-l-4 border-red-500">
            <CardBody className="py-4">
              <Typography color="red" className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </Typography>
            </CardBody>
          </Card>
        )}
        {!loading && !error && (
          <>
            {courses.length ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map(({ _id, title, description }) => (
                  <Card 
                    key={_id} 
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <Chip size="sm" value="Active" className="bg-green-100 text-green-800" />
                      </div>
                      
                      <Typography variant="h6" className="text-gray-800 mb-3 line-clamp-2">
                        {title}
                      </Typography>
                      
                      <Typography className="text-gray-600 text-sm mb-6 line-clamp-3">
                        {description || "No description available"}
                      </Typography>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outlined"
                          color="blue"
                          onClick={() => handleDetail(_id)}
                          className="flex-1 rounded-lg"
                        >
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          color="amber"
                          onClick={() => handleEdit(_id)}
                          className="flex-1 rounded-lg"
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          color="red"
                          onClick={() => handleDelete(_id)}
                          className="px-3 rounded-lg"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardBody>
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <Typography variant="h6" className="text-gray-800 mb-2">
                    No courses yet
                  </Typography>
                  <Typography className="text-gray-600 mb-6">
                    Start creating your first course to share knowledge with students
                  </Typography>
                  {user?.role === "teacher" && (
                    <Button color="blue" onClick={handleCreate} className="rounded-xl">
                      Create Your First Course
                    </Button>
                  )}
                </CardBody>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherPage;
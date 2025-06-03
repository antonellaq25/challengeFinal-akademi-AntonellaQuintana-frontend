import React from "react";
import { Navbar } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Layout({ children, user }) {
  return (
    <>
      <Navbar className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between">
          <Link to="/courses" className="font-bold text-lg">
            Courses
          </Link>
          <div className="flex gap-4">
            {user?.role === "student" && (
              <>
                <Link to="/student/enrollments">My courses</Link>
                <Link to="/student/grades">My Grades</Link>
              </>
            )}
            {user?.role === "teacher" && (
              <>
                <Link to="/my-courses">My courses</Link>
              </>
            )}
            {user?.role === "superadmin" && (
              <>
                <Link to="/admin">Dashboard</Link>
              </>
            )}
            <Link to="/login">Salir</Link>
          </div>
        </div>
      </Navbar>
      <main className="container mx-auto mt-6 px-4">{children}</main>
    </>
  );
}

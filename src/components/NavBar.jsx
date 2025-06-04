import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../store/types/authTypes";

const NavbarPanel = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  const navConfig = {
    superadmin: [
      { label: "Dashboard", to: "/admin" },
      { label: "New user", to: "/admin/new-user" },
      { label: "Courses", to: "/courses" },
      { label: "Users", to: "/users" },
      { label: "Stats", to: "/stats" },
    ],
    teacher: [
      { label: "Courses", to: "/teacher/courses" },
      { label: "Grades", to: "/teacher/grades" },
    ],
    student: [
      { label: "Courses", to: "/courses" },
      { label: "My courses", to: "/my-courses" },
      { label: "My grades", to: "/my-grades" },
    ],
  };

  const navItems = navConfig[role] || [];

  return (
    <Navbar className="mx-auto max-w-screen-xl p-4 mb-6">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="span"
          variant="h5"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          {role === "superadmin"
            ? "Admin Panel"
            : role === "teacher"
            ? "Teacher Panel"
            : "Student Panel"}
        </Typography>

        <ul className="flex gap-6 items-center">
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold" : "hover:text-blue-700"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </Navbar>
  );
};

export default NavbarPanel;

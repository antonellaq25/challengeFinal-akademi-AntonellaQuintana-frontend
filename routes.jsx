import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./src/components/ProtectedRoutes";
import Register from "./src/pages/Register"
import Login from "./src/pages/Login"
import CoursesPage from "./src/pages/CoursesPage";
import TeacherPage from "./src/pages/TeacherPage";
import AdminDashboardPage from "./src/pages/AdminDashboardPage";
import NewUserPage from "./src/pages/NewUserPage"
import CourseDetailPage from "./src/pages/CourseDetailPage";
import CourseList from "./src/pages/CourseList";
import TeacherGradesPage from "./src/pages/TeacherGradesPage";
import CreateCoursePage from "./src/pages/CreateCoursePage";
import EditCoursePage from "./src/pages/EditCoursePage";
import UsersPage from "./src/pages/UsersPage";

export default function AppRoutes({ user }) {
    console.log("usuarioactual", user)
    return (
        <Routes>

            <Route
                path="/courses"
                element={
                    <ProtectedRoute user={user} allowedRoles={["student", "superadmin"]}>
                        <CourseList user={user} />
                    </ProtectedRoute>
                }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
                path="/student/my-courses"
                element={
                    <ProtectedRoute user={user} allowedRoles={["student"]}>
                        <CoursesPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/courses"
                element={
                    <ProtectedRoute user={user} allowedRoles={["teacher"]}>
                        <TeacherPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/teacher/grades"
                element={
                    <ProtectedRoute user={user} allowedRoles={["teacher"]}>
                        <TeacherGradesPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/courses/create"
                element={
                    <ProtectedRoute user={user} allowedRoles={["teacher"]}>
                        <CreateCoursePage />
                    </ProtectedRoute>} />
            <Route path="/courses/:id/edit"
                element={
                    <ProtectedRoute user={user} allowedRoles={["teacher"]}><EditCoursePage />
                    </ProtectedRoute>} />

            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute user={user} allowedRoles={["superadmin"]}>
                        <AdminDashboardPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute user={user} allowedRoles={["superadmin"]}>
                        <UsersPage user={user} />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/new-user"
                element={
                    <ProtectedRoute user={user} allowedRoles={["superadmin"]}>
                        <NewUserPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<h1>404 - Page not found</h1>} />
        </Routes>
    );
}
